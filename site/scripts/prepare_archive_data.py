import csv, json, re
from pathlib import Path
from difflib import SequenceMatcher

ROOT = Path(__file__).resolve().parents[1]

def norm(value):
    value = (value or '').lower().replace('’', "'")
    value = re.sub(r'\.mp3$', '', value)
    value = re.sub(r'\b(19|20)\d{2}\b', '', value)
    return re.sub(r'[^a-z0-9]+', '', value)

def clean_title(value, year):
    value = (value or '').strip().replace('\\n', ' ')
    value = re.sub(rf'\s*[-–]\s*{year}\s*$', '', value)
    fixes = {
        'Rythm': 'Rhythm', 'Monring': 'Morning', 'Facsinating': 'Fascinating',
        'Cresent': 'Crescent', 'Govennor': 'Governor', 'Sining': 'Singing',
    }
    for old, new in fixes.items(): value = value.replace(old, new)
    return value.strip(' ,-')

files = json.loads((ROOT / 'app/data/audio-files.json').read_text(encoding='utf-8'))
by_year = {}
for item in files:
    by_year.setdefault(item['year'], []).append(item)

catalog = []
with (ROOT / 'data-audio-catalog.csv').open(encoding='utf-8-sig', newline='') as handle:
    for row in csv.DictReader(handle):
        year_raw = (row.get('YEAR') or '').strip()
        if not year_raw.isdigit(): continue
        year = int(year_raw)
        source_title = (row.get('SONG TITLE') or '').strip()
        if source_title.lower() == 'coming soon': continue
        track_raw = (row.get('TRACK NUMBER') or '').strip()
        track_number = int(float(track_raw)) if track_raw and re.match(r'^\d', track_raw) else 0
        target = norm(row.get('File Name') or source_title)
        candidates = [f for f in by_year.get(year, []) if not f['title'].lower().startswith('iush-')]
        best = max(candidates, key=lambda f: SequenceMatcher(None, target, norm(f['title'])).ratio(), default=None)
        score = SequenceMatcher(None, target, norm(best['title'])).ratio() if best else 0
        if best and score < .55: best = None
        catalog.append({
            'year': year, 'trackNumber': track_number, 'title': clean_title(source_title, year),
            'sourceTitle': source_title, 'fileId': best['id'] if best else None,
            'fileName': best['title'] if best else (row.get('File Name') or '').strip() or None,
        })

# Newer recordings are ingested directly from Drive filenames/folder labels because
# they are not represented in the legacy archive spreadsheet. Keep them as a
# separate source manifest, then merge here so regenerating the legacy data does
# not erase the 2000s/2010s additions.
new_recordings_path = ROOT / 'app/data/new-recordings.json'
if new_recordings_path.exists():
    newer = json.loads(new_recordings_path.read_text(encoding='utf-8'))
    known_file_ids = {item.get('fileId') for item in catalog if item.get('fileId')}
    catalog.extend(item for item in newer if item.get('fileId') not in known_file_ids)

catalog.sort(key=lambda x: (x['year'], x['trackNumber'], x['title'], x.get('collection', '')))
(ROOT / 'app/data/catalog.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding='utf-8')



# The source roadshow database was OCR/transcribed from historical records.
# Preserve the source CSV as-is, but normalize obvious location splits for display.
_LOCATION_CANONICAL = {
    'IN': [
        'Alexandria','Anderson','Auburn','Aurora','Batesville','Bedford','Beech Grove','Bloomfield','Bloomington','Bluffton','Boonville','Brownstown','Bunker Hill','Campbellsburg','Carmel','Clarksville','Clinton','Columbia City','Columbus','Connersville','Corydon','Crawfordsville','Danville','Decatur','Edinburgh','Elkhart','Ellettsville','Elwood','Evansville','Fort Wayne','Fowler','Frankfort','Franklin','French Lick','Goshen','Gosport','Greencastle','Greensburg','Greentown','Greenwood','Griffith','Hagerstown','Hammond','Hartford City','Highland','Howe','Huntingburg','Huntington','Huntsville','Indianapolis','Jasonville','Jeffersonville','Kendallville','Kentland','Kokomo','Lafayette','LaGrange','Lawrenceburg','Lebanon','Linton','Logansport','Lowell','Madison','Marion','Martinsville','Mentone','Michigan City','Mishawaka','Mitchell','Monon','Monroe','Monticello','Mount Vernon','Muncie','Munster','Nappanee','Nashville','New Albany','New Carlisle','New Castle','New Harmony','Noblesville','North Vernon','Oakland City','Osgood','Oxford','Pendleton','Peru','Petersburg','Plainfield','Plymouth','Portland','Princeton','Rensselaer','Richmond','Rochester','Rockville','Rome City','Saint Mary-of-the-Woods','Saint Meinrad','Scottsburg','Seymour','Shelbyville','Smithville','South Bend','Southport','Spencer','Speedway','Sullivan','Tell City','Terre Haute','Trafalgar','Turkey Run','Valparaiso','Vincennes','Wabash','Wakarusa','Walton','Warren','Warsaw','Washington','West Lafayette','Westfield','Whiteland','Winamac','Winchester','Zionsville'
    ],
    'IL': ['Arlington Heights','Bloomington','Chicago','Eureka','Godfrey','Glenview','Harvey','Mattoon','Mt. Carmel','Robinson','Wilmette','Edwardsville'],
    'OH': ['Cincinnati','Cleveland','Columbus','Dayton','Delaware','London','Middletown','Newark','Norwood','Toledo'],
    'MI': ['Birmingham','Detroit','Dowagiac','East Lansing','Grosse Ile','Mount Pleasant'],
    'KY': ['Bowling Green','Elizabethtown','Florence','Grayson','Hopkinsville; Cadiz','Lexington','Louisville','Owensboro','Richmond','Shelbyville'],
    'MO': ['Bridgeton','Desloge','Hannibal','Kansas City','Mexico','St. Louis'],
    'FL': ['Ft. Lauderdale','Orlando','Sarasota'],
    'TX': ['Houston','San Antonio','San Marcos'],
    'NY': ['Buffalo','Buffalo (Cheektowaga)','Poughkeepsie','Rochester','Williamsville'],
    'VA': ['Alexandria','Harrisonburg','Hot Springs','Lynchburg','Roanoke'],
    'NC': ['Charlotte','Raleigh'],
    'SC': ['Bluffton','Greenville'],
    'IA': ['Des Moines','Fairfield','Oelwein'],
    'MN': ['Owatonna'],
    'MA': ['Boston'],
    'CT': ['Hartford'],
    'NJ': ['Atlantic City','Westfield'],
    'CA': ['Los Angeles','San Francisco','San Diego'],
    'CO': ['Denver'],
    'GA': ['Atlanta'],
    'MS': ['Jackson'],
    'TN': ['Memphis','Nashville'],
    'KS': ['Lawrence'],
    'LA': ['New Orleans'],
    'WV': ['Montgomery','Morgantown'],
    'DC': ['Washington'],
    'AZ': ['Phoenix'],
    'NH': ['Wolfeboro'],
    'AR': ['Bella Vista'],
    'UK': ['Holyhead','London'],
    'Greece': ['Athens','Trikala','Volos'],
}

def _location_fingerprint(value):
    return re.sub(r'[^a-z0-9]', '', value.lower())

_LOCATION_BY_FINGERPRINT = {}
for _state, _cities in _LOCATION_CANONICAL.items():
    for _city in _cities:
        _LOCATION_BY_FINGERPRINT.setdefault(_location_fingerprint(_city), []).append((_city, _state))

_LOCATION_EXACT = {
    'Bloom inton': ('Bloomington','IN'), '9evay': ('Vevay','IN'), 'Mt. Verno n': ('Mount Vernon','IN'), 'Edinb urg': ('Edinburgh','IN'),
    'East Chica go': ('East Chicago','IN'), 'St. Meinr ad': ('Saint Meinrad','IN'), 'Saint Meinr ad': ('Saint Meinrad','IN'),
    'Blufto n': ('Bluffton','SC'), 'Eurek a': ('Eureka','IL'), 'Frankf urt': ('Frankfort','IN'), 'Los Angel os': ('Los Angeles','CA'),
    'Scotsb urg': ('Scottsburg','IN'), 'Cincin nati': ('Cincinnati','OH'), 'NI': ('Location not recorded',''), 'Berlio z': ('Berlioz',''),
    ',ndian apolis': ('Indianapolis','IN'), 'Indian napoli s': ('Indianapolis','IN'), 'Indian opolis': ('Indianapolis','IN'),
    '/eban on': ('Lebanon','IN'), '/ogan sport': ('Logansport','IN'), '/oZel l': ('Lowell','IN'), '/inton': ('Linton','IN'),
    '.oko mo': ('Kokomo','IN'), '.entla nd': ('Kentland','IN'), ':ina mac': ('Winamac','IN'), '5enss elear': ('Rensselaer','IN'),
    '7erre Haute': ('Terre Haute','IN'), ')ort :ayn e': ('Fort Wayne','IN'), 'CraZf ordsYil le': ('Crawfordsville','IN'),
    'Mount 9erno n': ('Mount Vernon','IN'), 'Nount Pleasa nt': ('Mount Pleasant','MI'), 'Houst an': ('Houston','TX'),
    'Detrio t': ('Detroit','MI'), 'Frech Lick': ('French Lick','IN'), 'French /ick': ('French Lick','IN'),
    'St. /ouis': ('St. Louis','MO'), 'Grosse Ille': ('Grosse Ile','MI'), 'Wimet te': ('Wilmette','IL'),
    'St. Marys -of- the- Wood s': ('Saint Mary-of-the-Woods','IN'), 'Saint Mary of the Wood s': ('Saint Mary-of-the-Woods','IN'),
    'Ft Wayn e': ('Fort Wayne','IN'), 'Ft. Wayn e': ('Fort Wayne','IN'), 'Fort Wayn e': ('Fort Wayne','IN'), 'Fort Wayn': ('Fort Wayne','IN'),
    'W. Lafaye tte': ('West Lafayette','IN'), 'West Lafaye tte': ('West Lafayette','IN'),
    'La Grang e': ('LaGrange','IN'), 'Lagra nge': ('LaGrange','IN'), 'LaGra nge': ('LaGrange','IN'),
    'Cities as Sched uled by Wendt': ('Cities as scheduled by Wendt',''),
    'As schedu led by Allied': ('As scheduled by Allied',''),
    'As Sched uled by Allied Conce rts': ('As scheduled by Allied Concerts',''),
}

def clean_roadshow_location(city, state):
    city = re.sub(r'\s+', ' ', city).strip()
    state = re.sub(r'\s+', ' ', state).strip()
    if city in _LOCATION_EXACT:
        return _LOCATION_EXACT[city]
    fp = _location_fingerprint(city)
    candidates = _LOCATION_BY_FINGERPRINT.get(fp, [])
    valid_state = state if state in _LOCATION_CANONICAL else {'I1':'IN','I/':'IN',',1':'IN','Gre ece':'Greece','M2':'MO','HN':'NH'}.get(state, state)
    if valid_state:
        same_state = [item for item in candidates if item[1] == valid_state]
        if len(same_state) == 1:
            return same_state[0]
    if len(candidates) == 1 and (state in {'I1','I/',',1','NI','Gre ece','M2','HN',''} or not re.fullmatch(r'[A-Z]{2}', state)):
        return candidates[0]
    return city, ({'I1':'IN','I/':'IN',',1':'IN','Gre ece':'Greece','M2':'MO','HN':'NH'}.get(state, state))

with (ROOT / 'data-roadshows.csv').open(encoding='utf-8-sig', newline='') as handle:
    rows = list(csv.reader(handle))
headers = [re.sub(r'\s+', ' ', cell).strip() for cell in rows[1][:17]]
roadshows = []
for raw in rows[2:]:
    raw = (raw + [''] * 17)[:17]
    item = dict(zip(headers, [re.sub(r'\s+', ' ', cell).strip() for cell in raw]))
    date = item.get('Date', '')
    match = re.search(r'(19|20)\d{2}', date)
    city = item.get('City', '')
    if not match or not city or city.lower().startswith('show'): continue
    roadshows.append({
        'id': item.get('Show ID', ''), 'year': int(match.group(0)), 'date': date,
        'city': clean_roadshow_location(city, item.get('State', ''))[0], 'state': clean_roadshow_location(city, item.get('State', ''))[1], 'group': item.get('Group Name', ''),
        'conductor': item.get('Conductor', ''), 'sponsor': item.get('Sponsor', ''),
        'event': item.get('Event', ''), 'venue': item.get('Place of Performance', ''),
        'time': item.get('Hour of Performance', ''), 'duration': item.get('Program Duration', ''),
    })

roadshows.sort(key=lambda x: (x['year'], x['date'], x['city']))
(ROOT / 'app/data/roadshows.json').write_text(json.dumps(roadshows, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'catalog': len(catalog), 'playable': sum(1 for x in catalog if x['fileId']), 'roadshows': len(roadshows)}))
