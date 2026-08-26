/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Header } from '../site-chrome';
import { photoArchive, photoCounts } from '../data/photo-archive';
import PhotoWall from './photo-wall';

export const metadata:Metadata={title:'Photos',description:'Wander through the Singing Hoosiers alumni photo archive, including the 75th anniversary, recent alumni gatherings, and earlier historical photographs.'};

export default function PhotosPage(){
  return <main>
    <Header/>
    <section className="page-hero photo-hero">
      <p className="eyebrow">Photo archive · still being identified</p>
      <h1>The photos never<br/><em>stayed in order.</em></h1>
      <p>That is part of the story. Boxes get opened. Prints get passed around. Digital folders inherit names like DSC_0042. Instead of pretending every image is perfectly cataloged, this archive lets you wander through what we have and help us identify what we do not.</p>
      <div className="photo-hero-stats"><strong>{photoCounts.total}</strong><span>browser-ready photographs currently gathered here</span></div>
    </section>

    <section className="photo-manifesto">
      <div><p className="eyebrow">A living photo box</p><h2>Browse by memory,<br/>not by filing cabinet.</h2></div>
      <div className="photo-manifesto-copy">
        <p>The 75th-anniversary materials gave us a clue for how this should feel. One Canva project stretches across 438 pages as a visual chronology from 1950 to 2025. Another asks alumni about favorite memories, lessons, and the words they use to describe their Singing Hoosiers experience.</p>
        <p>So the gallery has structure without pretending certainty: recent source folders stay visible, older photographs sit together as earlier archive material, and the wall can be shuffled whenever you want a different way into the story.</p>
      </div>
    </section>

    <section className="photo-feature" aria-labelledby="photo-feature-heading">
      <div className="photo-feature-copy">
        <p className="eyebrow">75th anniversary · April 5, 2025</p>
        <h2 id="photo-feature-heading">Seventy-five years,<br/>back in the same room.</h2>
        <p>The 2025 reunion is the best-documented recent moment in the shared archive: {photoCounts['2025']} photographs, a 438-page anniversary visual history, and an alumni memory project built around a familiar promise.</p>
        <blockquote>Once a Singing Hoosier, Always a Singing Hoosier.</blockquote>
      </div>
      <div className="photo-feature-stack" aria-hidden="true">
        {photoArchive.filter(p=>p.year==='2025').slice(0,3).map((photo,index)=><img key={photo.id} className={`stack-${index+1}`} src={`https://drive.google.com/thumbnail?id=${photo.id}&sz=w1400`} alt="" loading="eager"/>)}
      </div>
    </section>

    <section className="photo-browser" aria-labelledby="photo-browser-heading">
      <div className="photo-browser-heading"><div><p className="eyebrow">The archive table</p><h2 id="photo-browser-heading">Pick a year. Or don’t.</h2></div><p>Recent folders are grouped only where the source actually tells us something. No invented names. No fake precision.</p></div>
      <PhotoWall photos={photoArchive}/>
    </section>

    <section className="photo-sources">
      <div><p className="eyebrow">Source folders</p><h2>Want the unfiltered originals?</h2><p>The wall uses browser-friendly photographs. Source folders may also contain HEIC images, videos, duplicates, and material that has not been captioned yet.</p></div>
      <div className="photo-source-links">
        <a href="https://drive.google.com/drive/folders/16ocPk_T5mfJAwYzUwwJLZ9WEV0sE8GoM" target="_blank" rel="noreferrer"><b>2025 · 75th anniversary</b><span>{photoCounts['2025']} photos in this wall ↗</span></a>
        <a href="https://drive.google.com/drive/folders/1NmnEw_V_VSYDhE5QmNPMFUDZqd6ubZNU" target="_blank" rel="noreferrer"><b>2024 alumni photos</b><span>{photoCounts['2024']} browser-ready photos ↗</span></a>
        <a href="https://drive.google.com/drive/folders/1QIv8SrLAg6SZnCXu2hRnwFGTfj0Bxtmk" target="_blank" rel="noreferrer"><b>2023 alumni photos</b><span>{photoCounts['2023']} browser-ready photos ↗</span></a>
      </div>
    </section>

    <section className="history-coda photo-coda">
      <p className="eyebrow">Recognize someone? Know the year?</p>
      <h2>Help a photograph find its story.</h2>
      <p>A name, a date, a tour stop, or even “that was definitely Chimes” can turn a loose image into a useful historical record.</p>
      <Link className="primary-button" href="/contribute">Add context to the archive</Link>
    </section>
    <Footer/>
  </main>
}
