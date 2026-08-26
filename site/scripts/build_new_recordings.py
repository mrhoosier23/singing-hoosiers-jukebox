from urllib.parse import unquote_plus
import re, json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

album_unknown = [
('1BeEGMRlXmYNeSuzsrOGWtoTJjc2hunw1','02+Baby%2C+It_s+Cold+Outside++VJ+2011.mp3'),
('1_oTUopgcYKGyAFKuhKESOM6cxUVTEM7v','02+Dancing+Fool+11.mp3'),
('18zOhKNq75UYZid05PGYFr3yjtF3-7RZZ','02+Don+Juan+_Smokey+Joe_s_+-+Erica+Johnson+12.mp3'),
('1OqInuyL5qiZxf9oUeBEOAdts9WPO7wzn','02+Gershwin+Medley+_Wurm_Kunkel_+10.mp3'),
('12m00u_76cLtDOGjEoHl_7o_2E_I7n_aM','02+Ragtime+Opening+12.mp3'),
('1lQ8k_8TIzpPuQRC2UZ0d3imB5kG3V10m','02+Steppin_+Out+12.mp3'),
('19QZHycUs0oPlhHVlP0BmLu4SPJpAofrB','03+A+Rhapsody+on+Christmas+Carols.mp3'),
('1Xdug6czt00c1oOPGXtP-Ch9FzO7T4gBo','03+Favorite+Son+_Cody+Butcher_+12.mp3'),
('1kHFCy6jxeStxFXCT049_HehJmL76dqzw','03+Gershwin+Rhythm+10.mp3'),
('1igMnIML_XztbfAlE7dI8Tlcom5cCuSY4','03+Hero+_Abby+Kunkel_+12.mp3'),
('1trbzHtXYM6049D2Bplao01VjqOb-2qlb','03+Sleigh+Ride+2011+Varsity+Danced.mp3'),
('1oUg5iK2q2E2CeLTeJjeYN1-kTzra123n','03+Too+Darn+Hot+11.mp3'),
('1W0MTcobcai1FrZ7m8S0GdrHqYK6zvq7l','04+50_s+Medley+10.mp3'),
('1rRe00HG3Y2nad1hx6852J6VFRo5hIakh','04+Ole+Buttermilk+Sky+12.mp3'),
('1R-wPLHKnaHjE5SZd6GGARoGhUlgcWF8Z','04+Shout+About+My+Love+12.mp3'),
('1W_ExChTqI1AHfYUux1RtRP20S04pT8d4','04+This+could+Be+the+Start+of+Something+Big+-+10-1.mp3'),
('1gyIAUwQAP33UQYxZIjQI_oVjFUt_RShb','04+Winter+Wonderland+of+Snow.mp3'),
('1oXem7wmQG8tS9VgsCo1KFby41cxFRPX8','05+Adeste+Fidelis+11.mp3'),
('1JpIf_ofe5yyGhgIv4nd8Qj9vgGMnsBJe','05+Blow%2C+Garriel%2C+Blow+10_15_11+++Abby+Kunkel.mp3'),
('1xemL4CUCuuv7at4EfUo_ajkN3es9JFUE','05+Stardust+12.mp3'),
('1Cj8e_tzIcVtTE4R-K5qhWVvYuAaYMxMR','05+The+Way+You+Look+Tonight++10 (1).mp3'),
('1--GwBOFbjYNDIFki9SeoD1dx6qnagXb3','05+The+Way+You+Look+Tonight++10.mp3'),
('1IKUmioOTlFqLKHRDN5IKCpHPwGEZonLj','05+Two+Nobodys+in+NYC+-+Ramos+and+Scott+12.mp3'),
('1avMSPSqmT1HBREUipqC4Zjkkh-1pYmmg','05+Waltz+of+the+Flowers+2011+Ballet.mp3'),
('1B-8nBwuFu2x1ickpdZLq9rt0gxTmZkvK','06+Borogoditse+Devo+11.mp3'),
('1JsI6sAh4Qs4t7sZVd9hUJy5QR85SC9FW','06+It_s+the+Most+Wonderful+Time+of+the+Year+2011.mp3'),
('1WzSRViYw2-spHKclJzmaDpHkh3i1OLHZ','06+Lazy+River+12.mp3'),
('1eO9mw72RhpPxAMnDC4PQMOdrosrxRQXG','06+Song+those+Goes+Like+This+12.mp3'),
('13jXeIUOINi8feJlyD_Vphmf6wZTfSumt','06+The+Continental++10.mp3'),
('1m16-eYWvsD-ES54Ey9BhF9fVcoolY3Fy','07+Deck+the+Halls+11.mp3'),
('1KNd_0YMBcLx8iP7iniy_cX8oeqBYN5-9','07+Michael+Jackson+Medley+10.mp3'),
('1SUW6wpWMz5AwLTfYI9Im_A7QS6-s7qKI','07+Silver+Bells+2011+M.+Stern+_+M.+Day.mp3'),
('1c2ZrBy4HGuDng20djF4zT2voAXaUeCk7','08+Battle+Hymn+of+the+Republic+12.mp3'),
('17R0Lp8ymCqGvUJ7xlLENFDAjXdPskGGz','08+Grown+up+Christmas+List+2011+Abbie+Kunkel.mp3'),
('1_nuEHajGv2aW-KvHJai4XZJMM6k1D69y','08+In+the+Cool+Cool+Cool+of+the+Evening+10 (1).mp3'),
('1jQnsX97B0im5lRj5MsEfYB7Em9LnRkaW','08+Lullaby+12.mp3'),
('195MVPBhKVF1Kl2qwWkfh63_pwERmEkNI','08+We+Dance+11.mp3'),
('1F72sZ6NUBCl9lH1Agwg2JC2q4Ew_xK9s','09+An+Evening+_Day_+Medley+_Cobine_+10.mp3'),
('151EwZ-2NJUkZSIHYjOeJT1hLp5VbL5Hb','09+Jingle+Bells+2011.mp3'),
('1T2Y65868nV6_B88U3aNlxW-ABtw66tR1','09+Joint+is+Jumpin+1+12.mp3'),
('1fJarJg2qsCrEuZ9rDkm6Y6lDdprQhIx5','09+Stardust+10-1.mp3'),
('1-jlG5JE2nl-WFZFPA2jl5R7YeU9d5dzY','09+What+Do+I+Need+with+Love_+-+Michael+Day+12.mp3'),
('1DVTADjQGtB94JOghJmInHaCeWyM4GdKd','09+You_d+Be+So+Nice+to+Come+Home+to+-+11.mp3'),
('15dBD1yb3tBlGPsgvuioSZtDvK4C0gu3e','10 Track 10.mp3'),
('1M0iFsDAVXsGJQPnMF2LMVREg0A_Oo0UZ','10+Battle+Hymn+of+the+Republic+_Stoll+conducting_+10.mp3'),
('1hPLR0p9x_zL5Kf3QiCyLAojnsnu26a2i','10+Begin+th+Beguine+12.mp3'),
('1nantAey8WAcDFmZL0PL4diKqgec8Fvh8','10+Fly+Me+to+the+Moon+11.mp3'),
('1QKWL-6bdJ25oOVaGFvAiw-xcFL2GLTf3','10+My+Funny+Valentine+_arr.+Williams_+12.mp3'),
('1doAV8O-rynj353fMMBtsz-hwrfp3q5AZ','10+There_s+a+Fine%2C+Fine+Line+Erin+Mills+11.mp3'),
('1xmZACgQyOx2nB2eRfcjM-bLl7n4U8bcF','10+White+Christmas+2011.mp3'),
('1XLkq8zd1SAyExG5kECgBL85kllM8CLOZ','11+Begin+the+Beguine+10_15_11.mp3'),
('1Z9EIDqz2Y_Y7vEhxjvxTk6Nbu4wv8QE-','11+Carol+of+the+Drum+11.mp3'),
('1qn3-aFmlYvHmE0K7llHmUKuw3BEtuqo-','12+Betelehemu+11.mp3'),
('1XsxUdZV10AWuq4HSAUl5e1noYwqVK2EH','12+Skylark+_Cobine_+McLaughlin+10.mp3'),
('1oR0BXoVjFfP9nmZszK6_A_mbAoQNVGA8','13+Applause+11.mp3'),
('1L9Ua4ZNAix7uxBTMHBdxdONTcMXueID-','13+Porter+Gets+Funky+3+12.mp3'),
('1wHQHZfV7ubSuc4n7QJA5dH6zjuRRqye9','14+In+the+Cool%2C+Cool%2C+Cool+of+the+Evening+11.mp3'),
('1hdRxmh91r4F-62ESymTv7SZpo5kKlhhR','14+Piano+Man+-+Adam+Johnson+12.mp3'),
('1NYbsCQoHcli1Xu9Qg_CvjgTNPNXfD-tq','15+Hallelujah+2011.mp3'),
('14zmWRawcC4zpBTJtdg6bas2VvN_5lRLe','15+Shennandoah+12.mp3'),
('1EbcZiK1mUrSsE5GedpCf5dSCtOe7Cqcd','15+The+Nearness+of+You+_1940_+-+2004.m4a'),
('1cfbf7bVwIQli0EAV-G45IYBrgTT14eOf','16+De-Lovely+medley+11+-+1.mp3'),
('1wy0CQjy5B_WkfQoqa5-QznV6cCFU4zcu','16+Dona+Nobis+Pacem+2011 (1).mp3'),
('1PI9xju1FwEkEtIyrHh_GLlBza1-e6CnP','16+Dona+Nobis+Pacem+2011.mp3'),
('1SgUFVUGlukWXAd1p4UAXFOCnmNzr_DkL','18+My+Soul_s+Been+Anchored+in+the+Lord+12.mp3'),
('1FtgLfFNVcem4yFPwV6sli_rMMDhNksQh','19+Battle+Hymn+of+the+Republic+11.mp3'),
('1Xi9DGCG6mqmUn-h9X8KPdNT1pVIClXBO','20+Alexander_s+Ragtime+Band+12.mp3'),
('1-oD8XAyoM3y4j2tRxhE9xlZiCCXNKhf4','20+Georgia+-+09.mp3'),
('1UD-bPuuD0pwP-0OA_6dvKVw26rE1n1w-','21+Give+Me+Your+Tired%2C+Your+Poor+12.mp3'),
('1ykzQxQ5rBDTtYWVbQux9PCcSdRZx9k0X','21+Shenandoah+_Wilberg_+-+11.mp3'),
('1qWOxWiQZzKvECeTiIoTtxlXoDqp9FH-a','22+Favorite+Son+-+09++Wood.mp3'),
('1Y3qhRO1bT7lNOpG0_LhRsBtFgWcdoqw-','22+God+Bless+America+12.mp3'),
('1lLNpm6AKyEayTQZgtxh9MEaunsEy9y3A','23+Cowboy+Take+Me+Away+-+Duff%2C+Paulsen%2C+Crutchfield.mp3'),
('14ePB4StfuoWr1_hxktABKKo3NLQ8G3wg','25+Cindy+-+11.mp3'),
('1R10sg9Wc4aS6ob7X3FzTvVhTvqQf4lh6','Singing Hoosiers - -Georgia on My Mind-.mp3'),
]

fixed_collections = [
('Chimes 2012', 2012, [
('13ndKrEiBDGmJ64C2myUjUU3Zfms736lG','02+Joy+To+The+World+%28Zegree%29.mp3'),
('1RS-SmFVrEd7-jpqIw9zq_7jnEanQrvCQ','03+The+Music+of+Christmas.mp3'),
('1mIdgc2BrgLxOAxgWGCrZqnhhCoJH4Eht','04+Christmas+is+My+Favorite+Time+of+Year.mp3'),
('1xv5Tu5AI1dLG4eT7wvugWhJzma4llwNb','04+Jingle+Bell+Fantasy.mp3'),
('1YzR5n-ptVJ1Z9d6bYkQCvDP1_n3eXvfd','06+Santa+Claus+is+Coming+to+Town.mp3'),
('154mDT-282OMUknM5mgE4RtIwpb5D0MP7','06+Silent+Night+%28Wilder%29.mp3'),
('16Ax7vauGdzJUqgSNMwxsDvB9WgSR4ys9','06+Sugar+Rum+Cherry.mp3'),
('1VsIZT-zNjBgN-7dYMloQHG13fv4DLzDw','07+Hallelujah+Chorus+%28Warren%29.mp3'),
('1lCu97Jl_b6IpeRKHn97BwjXP23SxgdRN','07+Little+Saint+Nick.mp3'),
]),
('Spring Concert 2013', 2013, [
('1ZqybuZS_NjkJGKM0seYQMMEGaDlHhZtC','02+This+is+Singing+Hoosiers.mp3'),
('1hfh1OhX5Xrr0wYM_LdMLf42X3u-5Uocn','04+Keep+Movin%27.mp3'),
('1F6RWiOprMm7-yfQVW5ZGuiVgSftvrYDk','05+Georgia+%28Zegree%29.mp3'),
('1HdVgd5Klq8SQYl1FhxH9dottPCftjH_U','06+Steppin%27+Out+%2713.mp3'),
('1htGJSAG4TY0uWQKY8xPNdwLQZzA2Yw8r','07+Smack+Dab.mp3'),
('1ODGon-dYuwG9bBA_PevvbCL7WaauUj7t','09+Skylark+%2713.mp3'),
('1zzqBZb2Nm9bWqX4Zo6qjVxQ97z6rm46x','10+I+Don%27t+Know+What+You+Come+to+Do.mp3'),
('1bKbypIRqHNXHFsn3NiqjxQk1exZv9hB7','13+My+Country+%27Tis+Thee.mp3'),
('14GJuQxmwTu4pi30R6E-yUjAF43lr8LPg','14+Star+Spangled+Banner.mp3'),
('1IU4rqHm9H8vK8qjfDS1mf2ixG4MtJJhe','14+Time+Medley.mp3'),
('1AtIxGM59u4A-CjgrFR4JdKBLIJ-v9Q3L','15+Battle+Hymn+of+the+Republic+%2713.mp3'),
('1QOnt1RSlz3zfUiERe2msES74rSLsbzSz','16+I%27ve+Got+You+Under+My+Skin.mp3'),
('1Re5Hh2m3iy5MdtU7rk5I-BqjEw8pCZVl','17+Stardust+%2713.mp3'),
('1TTLhWFcsrVEpqu-Cu6s76mwx0rmKW_jy','19+You+Are+My+Sunshine.mp3'),
('1nOKkQlgNrJ27Uo4xMPLjD8SjS3qnOStW','20+And+So+It+Goes.mp3'),
('1IB4oVxyiSaVikRleKklgtz9I2sQbjVPk','21+Stand+Up+For+Love.mp3'),
('1mPKYA2QnOQ5iKK8lkzEpA9MbxnfXhnot','22+John+Williams+Medley.mp3'),
('18N0xL37bb2W3h0dyHBZAMde_Omwq1eVf','23+Space+Medley.mp3'),
('14g5T5AzmsCo5kuFB9JuCowJyzuqPSND4','24+I+Can.mp3'),
]),
('Singing Hoosiers Spring Concert 2014', 2014, [('1Lo750OW5PfZHVk_q7rVNJbgJ4jVNbBDO',"02 Can't Hold Us-Happy.mp3")]),
('Europe Promo CD', 2001, [('1rltWZwkJ7_pnctAUkPDRjuqyCXcg1cbp','01+Steppin_+Out+with+My+Baby+1.mp3')]),
('The Singing Hoosiers Promotion CD', 2008, [('1E4931CxYSWpzhK6ki1M8JN280Fjmw04V','15+Applause+-+08.mp3')]),
]

def decode_name(name):
    return unquote_plus(name)

def track_num(name):
    s=decode_name(name)
    m=re.match(r'^(\d{1,2})\s*',s)
    return int(m.group(1)) if m else 0

def infer_year(name):
    s=decode_name(name)
    stem=re.sub(r'\.(mp3|m4a)$','',s,flags=re.I)
    # Remove leading track number before looking for a year.
    rest=re.sub(r'^\d{1,2}\s*','',stem)
    full=re.findall(r'(?<!\d)(20\d{2})(?!\d)',rest)
    if full:
        return int(full[-1])
    # Dates like 10_15_11 and suffix years like -09, +11, 10-1, 10 (1).
    twos=re.findall(r'(?<!\d)(0\d|1\d)(?!\d)',rest)
    if twos:
        return 2000+int(twos[-1])
    # one-digit year only if it is the terminal numeric token
    one=re.search(r'(?<!\d)([0-9])(?:\s*(?:\(1\)|-1)?)?$',rest)
    if one:
        return 2000+int(one.group(1))
    return None

def clean_title(name, year=None):
    s=decode_name(name)
    s=re.sub(r'\.(mp3|m4a)$','',s,flags=re.I)
    s=re.sub(r'^\s*\d{1,2}\s*[- ]*','',s)
    # Strip full recording-date stamps before underscores are normalized.
    # Example: 10_15_11 is a date marker, not part of the song title.
    s=re.sub(r'(?<!\d)\d{1,2}[_ -]\d{1,2}[_ -](?:20)?\d{2}(?!\d)',' ',s)
    # Common underscore encodings in source filenames.
    fixes={"It_s":"It's","There_s":"There's","You_d":"You'd","Soul_s":"Soul's","Alexander_s":"Alexander's","Steppin_":"Steppin'","50_s":"50's","Joe_s":"Joe's"}
    for a,b in fixes.items(): s=s.replace(a,b)
    s=s.replace('_',' ')
    # Remove recording-year indicators while leaving historical years such as 1940
    # when 2004 is the recording year.
    if year:
        yy=str(year)[-2:]
        # Apostrophe-year suffixes need to go as a unit so no stray apostrophe remains.
        s=re.sub(rf"\s*['’]{re.escape(yy)}\b",' ',s)
        s=re.sub(rf'(?<!\d){year}(?!\d)',' ',s)
        s=re.sub(rf'(?<!\d){yy}(?!\d)',' ',s)
        # A one-digit filename suffix represents 2000-2009, per the archive rule.
        if 2000 <= year <= 2009:
            digit=str(year)[-1]
            s=re.sub(rf'(?<!\d){digit}(?!\d)\s*$',' ',s)
    s=re.sub(r'\s*\(1\)\s*$',' ',s)
    s=re.sub(r'\s*-\s*1\s*$',' ',s)
    s=re.sub(r'\s+',' ',s).strip(' -_')
    s=s.replace('Song those Goes Like This','The Song That Goes Like This')
    s=s.replace('Begin th Beguine','Begin the Beguine')
    s=s.replace('Shennandoah','Shenandoah')
    s=s.replace('Nobodys','Nobodies')
    s=s.replace('Garriel','Gabriel')
    return s.strip()

entries=[]
unresolved=[]
for fid,name in album_unknown:
    y=infer_year(name)
    if y is None:
        unresolved.append({'collection':'Album Unknown','fileId':fid,'fileName':decode_name(name),'trackNumber':track_num(name),'title':clean_title(name)})
        continue
    entries.append({'year':y,'trackNumber':track_num(name),'title':clean_title(name,y),'sourceTitle':decode_name(name),'fileId':fid,'fileName':decode_name(name),'collection':'Album Unknown'})

for collection,year,items in fixed_collections:
    for fid,name in items:
        entries.append({'year':year,'trackNumber':track_num(name),'title':clean_title(name,year),'sourceTitle':decode_name(name),'fileId':fid,'fileName':decode_name(name),'collection':collection})

# Deduplicate obvious duplicate uploads with the same year/track/title, preferring filenames without copy markers.
def dupe_rank(e):
    n=e['fileName']
    return (('(1)' in n) or bool(re.search(r'-1\.(mp3|m4a)$',n,re.I)), n)
seen={}
for e in entries:
    k=(e['year'],e['trackNumber'],re.sub(r'[^a-z0-9]','',e['title'].lower()))
    if k not in seen or dupe_rank(e)<dupe_rank(seen[k]): seen[k]=e
entries=list(seen.values())
entries.sort(key=lambda x:(x['year'],x['trackNumber'],x['title']))

(ROOT/'app/data/new-recordings.json').write_text(json.dumps(entries,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'app/data/unresolved-recordings.json').write_text(json.dumps(unresolved,ensure_ascii=False,indent=2),encoding='utf-8')
print('new playable',len(entries))
from collections import Counter
print('years',Counter(e['year'] for e in entries))
print('unresolved',len(unresolved),[x['fileName'] for x in unresolved])
print('dupes removed', len(album_unknown)+sum(len(x[2]) for x in fixed_collections)-len(unresolved)-len(entries))
