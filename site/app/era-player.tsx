'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import archiveCatalog from './data/catalog.json';
import { EraObject } from './player-objects';
import { driveFileUrl, drivePreviewUrl } from './drive-media';

type Track = { year:number; trackNumber:number; title:string; sourceTitle:string; fileId:string|null; fileName:string|null; collection?:string };

const eras = [
  { id:'1950s', label:'1950s', player:'Table radio', start:1950, end:1959 },
  { id:'1960s', label:'1960s', player:'Hi-fi console', start:1960, end:1969 },
  { id:'1970s', label:'1970s', player:'Tape deck', start:1970, end:1979 },
  { id:'1980s', label:'1980s', player:'Portable cassette', start:1980, end:1989 },
  { id:'1990s', label:'1990s', player:'Compact disc', start:1990, end:1999 },
  { id:'2000s', label:'2000s', player:'Pocket music player', start:2000, end:2009 },
  { id:'2010s', label:'2010s+', player:'Streaming player', start:2010, end:2099 },
];
const catalog = archiveCatalog as Track[];

export function EraPlayer() {
  const [era, setEra] = useState('1960s');
  const [year, setYear] = useState(1967);
  const [trackIndex, setTrackIndex] = useState(0);
  const selectedEra = eras.find((item) => item.id === era)!;
  const eraYears = useMemo(() => [...new Set(catalog.filter((track) => track.year >= selectedEra.start && track.year <= selectedEra.end).map((track) => track.year))], [selectedEra]);
  const tracks = useMemo(() => catalog.filter((track) => track.year === year && track.year >= selectedEra.start && track.year <= selectedEra.end), [year, selectedEra]);
  const current = tracks[trackIndex];

  function selectEra(nextEra:string) {
    const next = eras.find((item) => item.id === nextEra);
    if (!next) return;
    const nextYear = [...new Set(catalog.filter((track) => track.year >= next.start && track.year <= next.end).map((track) => track.year))][0];
    setEra(nextEra);
    if (nextYear) setYear(nextYear);
    setTrackIndex(0);
  }

  function selectTrack(index:number) { setTrackIndex(index); }
  function skip(direction:number) { if (tracks.length) selectTrack((trackIndex+direction+tracks.length)%tracks.length); }

  return <div className="jukebox-shell">
    <div className="era-chooser">
      <span className="field-label">I sang in the</span>
      <div className="era-tabs" role="group" aria-label="Choose your Singing Hoosiers era">
        {eras.map((item)=><button key={item.id} className={era===item.id?'active':''} onClick={()=>selectEra(item.id)} aria-pressed={era===item.id}>{item.label}</button>)}
      </div>
      <span className="player-hint">Your player: <b>{selectedEra.player}</b></span>
    </div>
    <div className={`era-player era-${era}`} data-era={era}>
      <div>
        <EraObject
          era={era}
          title={current?.title||'Your era belongs here'}
          subtitle={current?`${current.collection ? `${current.collection} · ` : ''}Track ${current.trackNumber}`:'No recordings in this decade yet'}
          year={current?.year||selectedEra.label}
          previewUrl={current?.fileId ? drivePreviewUrl(current.fileId) : null}
          available={Boolean(current?.fileId)}
          canNavigate={tracks.length > 1}
          onPrevious={()=>skip(-1)}
          onNext={()=>skip(1)}
        />
        {current?.fileId&&<p className="player-message">If the embedded player is blocked by your browser, <a href={driveFileUrl(current.fileId)} target="_blank" rel="noreferrer">open this recording in Drive</a>.</p>}
      </div>
      <div className="track-browser">
        <div className="track-browser-head"><div><span className="field-label">Now browsing</span><h3>{eraYears.length ? `${year} recordings` : `${selectedEra.label} archive`}</h3></div>{eraYears.length>1&&<label className="year-select"><span>Year</span><select value={year} onChange={(event)=>{setYear(Number(event.target.value));setTrackIndex(0)}}>{eraYears.map((item)=><option key={item}>{item}</option>)}</select></label>}</div>
        {tracks.length ? <ol>{tracks.map((track,index)=><li key={`${track.year}-${track.trackNumber}-${track.fileId || index}`}><button onClick={()=>selectTrack(index)} className={index===trackIndex?'selected':''} aria-current={index===trackIndex?'true':undefined}><span className="track-number">{String(track.trackNumber).padStart(2,'0')}</span><span className="track-copy"><strong>{track.title}</strong><small>{track.fileId ? (track.collection ? `Recording available · ${track.collection}` : 'Recording available') : 'Cataloged · recording needed'}</small></span><span className="track-action">{index===trackIndex?'Selected':'Select'}</span></button></li>)}</ol> : <div className="empty-archive"><strong>Help us fill this shelf.</strong><p>We do not have separated recordings for this decade yet.</p><Link href="/contribute">Share a recording</Link></div>}
      </div>
    </div>
    <p className="simple-player-note">Prefer today&apos;s controls? <button onClick={()=>selectEra('2010s')}>Switch to the modern player</button></p>
  </div>;
}
