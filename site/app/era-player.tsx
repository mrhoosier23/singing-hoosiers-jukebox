'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import archiveCatalog from './data/catalog.json';
import { EraObject } from './player-objects';
import { driveAudioUrl, driveFileUrl } from './drive-media';

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
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [message, setMessage] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const selectedEra = eras.find((item) => item.id === era)!;
  const eraYears = useMemo(() => [...new Set(catalog.filter((track) => track.year >= selectedEra.start && track.year <= selectedEra.end).map((track) => track.year))], [selectedEra]);
  const tracks = useMemo(() => catalog.filter((track) => track.year === year && track.year >= selectedEra.start && track.year <= selectedEra.end), [year, selectedEra]);
  const current = tracks[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncTime = () => setTime(audio.currentTime || 0);
    const syncDuration = () => setDuration(audio.duration || 0);
    const stopped = () => setPlaying(false);
    const failed = () => { setPlaying(false); setMessage('This recording could not be loaded. Please try another selection.'); };
    audio.load();
    audio.addEventListener('timeupdate', syncTime); audio.addEventListener('loadedmetadata', syncDuration); audio.addEventListener('ended', stopped); audio.addEventListener('error', failed);
    return () => { audio.removeEventListener('timeupdate', syncTime); audio.removeEventListener('loadedmetadata', syncDuration); audio.removeEventListener('ended', stopped); audio.removeEventListener('error', failed); };
  }, [current?.fileId]);

  function selectEra(nextEra:string) {
    const next = eras.find((item) => item.id === nextEra);
    if (!next) return;
    audioRef.current?.pause();
    const nextYear = [...new Set(catalog.filter((track) => track.year >= next.start && track.year <= next.end).map((track) => track.year))][0];
    setEra(nextEra);
    if (nextYear) setYear(nextYear);
    setTrackIndex(0); setPlaying(false); setTime(0); setMessage('');
  }

  function format(seconds:number) { if (!Number.isFinite(seconds)) return '0:00'; return `${Math.floor(seconds/60)}:${Math.floor(seconds%60).toString().padStart(2,'0')}`; }
  function selectTrack(index:number) { setTrackIndex(index); setPlaying(false); setTime(0); setMessage(''); }
  function skip(direction:number) { if (tracks.length) selectTrack((trackIndex+direction+tracks.length)%tracks.length); }
  function stop(){if(audioRef.current){audioRef.current.currentTime=0;audioRef.current.pause()}setPlaying(false)}
  function seek(value:number){if(audioRef.current&&duration)audioRef.current.currentTime=(value/1000)*duration}
  async function toggle() {
    const audio=audioRef.current;
    if (!audio || !current?.fileId) { setMessage('This selection is cataloged, but its individual recording is not available yet.'); return; }
    if (playing) { audio.pause(); setPlaying(false); }
    else { try { if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) audio.load(); await audio.play(); setPlaying(true); setMessage(''); } catch { setPlaying(false); setMessage('Your browser paused this recording. Press Play once more, or open the recording in Drive.'); } }
  }

  return <div className="jukebox-shell">
    <div className="era-chooser">
      <span className="field-label">I sang in the</span>
      <div className="era-tabs" role="group" aria-label="Choose your Singing Hoosiers era">
        {eras.map((item)=><button key={item.id} className={era===item.id?'active':''} onClick={()=>selectEra(item.id)} aria-pressed={era===item.id}>{item.label}</button>)}
      </div>
      <span className="player-hint">Your player: <b>{selectedEra.player}</b></span>
    </div>
    <div className={`era-player era-${era}`} data-era={era}>
      {current?.fileId && <audio ref={audioRef} src={driveAudioUrl(current.fileId)} preload="metadata" playsInline />}
      <div><EraObject era={era} title={current?.title||'Your era belongs here'} subtitle={current?`${current.collection ? `${current.collection} · ` : ''}Track ${current.trackNumber}`:'No recordings in this decade yet'} year={current?.year||selectedEra.label} playing={playing} time={format(time)} duration={format(duration)} progress={duration?Math.round((time/duration)*1000):0} available={Boolean(current?.fileId)} onToggle={toggle} onStop={stop} onPrevious={()=>skip(-1)} onNext={()=>skip(1)} onSeek={seek}/>{message&&<p className="player-message" role="status">{message}{current?.fileId&&<> <a href={driveFileUrl(current.fileId)} target="_blank" rel="noreferrer">Open in Drive</a></>}</p>}</div>
      <div className="track-browser">
        <div className="track-browser-head"><div><span className="field-label">Now browsing</span><h3>{eraYears.length ? `${year} recordings` : `${selectedEra.label} archive`}</h3></div>{eraYears.length>1&&<label className="year-select"><span>Year</span><select value={year} onChange={(event)=>{setYear(Number(event.target.value));setTrackIndex(0)}}>{eraYears.map((item)=><option key={item}>{item}</option>)}</select></label>}</div>
        {tracks.length ? <ol>{tracks.map((track,index)=><li key={`${track.year}-${track.trackNumber}-${track.fileId || index}`}><button onClick={()=>selectTrack(index)} className={index===trackIndex?'selected':''} aria-current={index===trackIndex?'true':undefined}><span className="track-number">{String(track.trackNumber).padStart(2,'0')}</span><span className="track-copy"><strong>{track.title}</strong><small>{track.fileId ? (track.collection ? `Recording available · ${track.collection}` : 'Recording available') : 'Cataloged · recording needed'}</small></span><span className="track-action">{index===trackIndex&&playing?'Playing':'Select'}</span></button></li>)}</ol> : <div className="empty-archive"><strong>Help us fill this shelf.</strong><p>We do not have separated recordings for this decade yet.</p><Link href="/contribute">Share a recording</Link></div>}
      </div>
    </div>
    <p className="simple-player-note">Prefer today&apos;s controls? <button onClick={()=>selectEra('2010s')}>Switch to the modern player</button></p>
  </div>;
}
