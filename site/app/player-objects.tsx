'use client';

import Image from 'next/image';
import { siteAsset } from './site-path';

type Props={
  title:string;
  subtitle:string;
  year:string|number;
  previewUrl:string|null;
  available:boolean;
  canNavigate:boolean;
  onPrevious:()=>void;
  onNext:()=>void;
};

function Readout({title,subtitle,year}:Pick<Props,'title'|'subtitle'|'year'>){
  return <div className="device-readout"><span>Now selected</span><strong>{title}</strong><b>{year} · {subtitle}</b></div>;
}

function DeviceImage({src,alt}: {src:string;alt:string}){
  return <div className="device-photo"><Image src={siteAsset(src)} alt={alt} width={1536} height={1024} priority sizes="(max-width: 1000px) 94vw, 52vw"/></div>;
}

function DriveEmbed({previewUrl,available,title}:Pick<Props,'previewUrl'|'available'|'title'>){
  if(!available||!previewUrl){
    return <div style={{border:'1px solid rgba(255,255,255,.16)',borderRadius:14,padding:'18px 16px',margin:'12px 0',textAlign:'center'}}>
      <strong>Recording needed</strong>
      <p style={{margin:'6px 0 0',opacity:.72,fontSize:'.9rem'}}>This selection is cataloged, but no playable file is attached yet.</p>
    </div>;
  }
  return <div style={{margin:'12px 0 10px'}}>
    <iframe
      key={previewUrl}
      src={previewUrl}
      title={`Listen to ${title}`}
      allow="autoplay"
      loading="lazy"
      style={{display:'block',width:'100%',height:120,border:0,borderRadius:12,background:'#fff'}}
    />
    <small style={{display:'block',marginTop:6,opacity:.68}}>Playback is served by Google Drive. Use the controls above to play, pause, and seek.</small>
  </div>;
}

function NavButtons({p,previousLabel,nextLabel,className}:{p:Props;previousLabel:string;nextLabel:string;className:string}){
  return <div className={className}>
    <button onClick={p.onPrevious} disabled={!p.canNavigate}>{previousLabel}</button>
    <button onClick={p.onNext} disabled={!p.canNavigate}>{nextLabel}</button>
  </div>;
}

function RadioObject(p:Props){return <section className="media-object device-object radio-v2" aria-label="1950s tabletop radio player"><DeviceImage src="/players/radio-1950s-v2.png" alt="Warm walnut 1950s tabletop radio"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="Tune previous station" nextLabel="Tune next station" className="radio-v2-controls"/></div></section>}

function HifiObject(p:Props){return <section className="media-object device-object hifi-v2" aria-label="1960s console hi-fi player"><DeviceImage src="/players/hifi-1960s-v2.png" alt="Walnut 1960s console hi-fi with record player"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="Previous record" nextLabel="Next record" className="hifi-v2-controls"/></div></section>}

function EightTrackObject(p:Props){return <section className="media-object device-object eighttrack-v2" aria-label="1970s eight-track deck player"><DeviceImage src="/players/eight-track-1970s-v2.png" alt="Brushed metal 1970s eight-track stereo deck"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="◀◀ Previous" nextLabel="Program ▶▶" className="eighttrack-v2-controls"/></div></section>}

function BoomboxObject(p:Props){return <section className="media-object device-object boombox-v2" aria-label="1980s cassette boombox player"><DeviceImage src="/players/boombox-1980s-v2.png" alt="Large silver 1980s cassette boombox"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="◀◀ Rewind" nextLabel="Fast forward ▶▶" className="boombox-v2-controls"/></div></section>}

function DiscObject(p:Props){return <section className="media-object device-object disc-v2" aria-label="1990s portable compact disc player"><DeviceImage src="/players/discman-1990s-v2.png" alt="Silver 1990s portable compact disc player with headphones"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="Back" nextLabel="Next track" className="disc-v2-controls"/></div></section>}

function PocketObject(p:Props){return <section className="media-object device-object pocket-v2" aria-label="2000s pocket music player"><DeviceImage src="/players/pocket-2000s-v2.png" alt="White early-2000s pocket music player with click wheel"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="Previous" nextLabel="Next" className="pocket-v2-controls"/></div></section>}

function StreamingObject(p:Props){return <section className="media-object device-object touch-v2" aria-label="Modern touchscreen music player"><DeviceImage src="/players/touch-2010s-v2.png" alt="Modern touchscreen player on a walnut listening stand"/><div className="device-console"><Readout {...p}/><DriveEmbed {...p}/><NavButtons p={p} previousLabel="Previous song" nextLabel="Next song" className="touch-v2-controls"/></div></section>}

export function EraObject({era,...props}:Props&{era:string}){
  if(era==='1950s')return <RadioObject {...props}/>;
  if(era==='1960s')return <HifiObject {...props}/>;
  if(era==='1970s')return <EightTrackObject {...props}/>;
  if(era==='1980s')return <BoomboxObject {...props}/>;
  if(era==='1990s')return <DiscObject {...props}/>;
  if(era==='2000s')return <PocketObject {...props}/>;
  return <StreamingObject {...props}/>;
}
