'use client';
import { useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { driveAudioUrl, driveFileUrl } from '../drive-media';

type Track={year:number;trackNumber:number;title:string;sourceTitle:string;fileId:string|null;fileName:string|null;collection?:string};
type UnresolvedTrack={trackNumber:number;title:string;fileId:string;fileName:string;collection?:string};
type LibraryTrack=Track & {yearLabel:string;yearValue:string};

export function SongLibrary({data,unresolved=[]}:{data:Track[];unresolved?:UnresolvedTrack[]}){
  const [query,setQuery]=useState('');
  const [year,setYear]=useState('all');
  const [current,setCurrent]=useState<LibraryTrack|null>(null);
  const [message,setMessage]=useState('');
  const audio=useRef<HTMLAudioElement>(null);
  const years=[...new Set(data.map((item)=>item.year))].sort((a,b)=>a-b);
  const all=useMemo<LibraryTrack[]>(()=>[
    ...data.map((item)=>({...item,yearLabel:String(item.year),yearValue:String(item.year)})),
    ...unresolved.map((item)=>({...item,year:0,sourceTitle:item.fileName,yearLabel:'Unknown',yearValue:'unknown'})),
  ],[data,unresolved]);
  const results=useMemo(()=>{
    const needle=query.toLowerCase().trim();
    return all.filter((item)=>(year==='all'||item.yearValue===year)&&(!needle||`${item.title} ${item.sourceTitle} ${item.collection||''}`.toLowerCase().includes(needle)));
  },[all,query,year]);
  async function play(track:LibraryTrack){
    if(!track.fileId)return;
    setMessage('Loading recording…');
    flushSync(()=>setCurrent(track));
    const player=audio.current;
    if(!player)return;
    try { player.load(); await player.play(); setMessage(''); }
    catch { setMessage('Press Play in the audio controls, or open this recording in Drive.'); }
  }
  return <section className="library-section">
    <div className="library-controls">
      <label><span>Song title or medley</span><input type="search" placeholder="Try Stardust, Disney, or Hoagy Carmichael" value={query} onChange={(e)=>setQuery(e.target.value)}/></label>
      <label><span>Recorded year</span><select value={year} onChange={(e)=>setYear(e.target.value)}><option value="all">All years</option>{years.map((item)=><option key={item} value={item}>{item}</option>)}{unresolved.length>0&&<option value="unknown">Year unknown</option>}</select></label>
    </div>
    <div className="results-heading" aria-live="polite"><h2>{results.length} {results.length===1?'selection':'selections'}</h2><p>Choose Play to hear an available recording.</p></div>
    <div className="song-table" role="table" aria-label="Singing Hoosiers song library">
      <div className="song-row song-head" role="row"><span>Year</span><span>Track</span><span>Title</span><span>Recording</span></div>
      {results.map((track)=><div className={`song-row ${current?.fileId===track.fileId?'current':''}`} role="row" key={`${track.yearValue}-${track.trackNumber}-${track.fileId||track.title}`}><span>{track.yearLabel}</span><span>{track.trackNumber||'?'}</span><strong>{track.title}{track.collection&&<small> · {track.collection}</small>}</strong>{track.fileId?<button onClick={()=>play(track)}>{current?.fileId===track.fileId?'Playing / Replay':'Play'}</button>:<span className="needed">Needed</span>}</div>)}
    </div>
    {current&&<div className="library-player"><div><span>Now playing</span><strong>{current.yearLabel} · {current.title}</strong>{message&&<small role="status">{message} <a href={driveFileUrl(current.fileId!)} target="_blank" rel="noreferrer">Open in Drive</a></small>}</div><audio ref={audio} controls playsInline preload="metadata" onCanPlay={()=>setMessage('')} onError={()=>setMessage('This recording could not be loaded here. Open it in Drive instead.')} src={driveAudioUrl(current.fileId!)}/></div>}
  </section>;
}
