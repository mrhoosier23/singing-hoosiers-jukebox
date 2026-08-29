import { EraPlayer } from './era-player';
import { Footer, Header } from './site-chrome';
import Image from 'next/image';
import Link from 'next/link';
import catalog from './data/catalog.json';
import unresolved from './data/unresolved-recordings.json';
import { siteAsset } from './site-path';

export default function Home() {
  const playable = catalog.filter((item) => item.fileId).length;
  const recordingCount = playable + unresolved.length;
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <p className="anniversary-kicker">75 years in harmony</p>
          <h1>The songs remember <em>all of us.</em></h1>
          <p className="lede">Find the years you sang, hear the voices you remember, and follow the Singing Hoosiers from Bloomington to stages around the world.</p>
          <a className="primary-button" href="#listen">Choose your era</a>
        </div>
        <div className="archive-collage" aria-label="Singing Hoosiers photographs and historic logos">
          <figure className="collage-main"><Image src={siteAsset("/archive/musicana-1980.jpg")} alt="Singing Hoosiers performers in costume during Musicana in 1980" fill priority sizes="(max-width: 1000px) 100vw, 52vw"/><figcaption>Musicana, 1980</figcaption></figure>
          <figure className="collage-memory"><Image src={siteAsset("/archive/historical-1970.jpg")} alt="Three Singing Hoosiers alumni together at a reunion" fill sizes="(max-width: 700px) 48vw, 20vw"/><figcaption>Old friends, still in harmony</figcaption></figure>
          <div className="collage-logo"><Image src={siteAsset("/archive/original-logo.png")} alt="Historic Singing Hoosiers singers logo" width={290} height={290}/><span>From the archive</span></div>
          <div className="hero-years"><strong>1950</strong><span>to</span><strong>2025</strong></div>
        </div>
      </section>
      <section className="listen-section" id="listen">
        <div className="section-heading">
          <div><p className="eyebrow">Your music, your way</p><h2>What years were you a Singing Hoosier?</h2></div>
          <p>Choose the era that feels familiar. Each decade gives you a player modeled on the object you would have reached for then.</p>
        </div>
        <EraPlayer />
      </section>
      <section className="archive-ribbon" aria-label="Archive overview">
        <div><strong>1949</strong><span>first roadshow records</span></div><div><strong>2,300+</strong><span>performances documented</span></div><div><strong>{recordingCount}</strong><span>playable recordings</span></div><div><strong>75</strong><span>years of serious fun</span></div>
      </section>
      <section className="story-grid" id="history">
        <article className="story-main"><p className="eyebrow">From concert choir to American show choir</p><h2>A tradition built to travel.</h2><p>The ensemble grew from Indiana University&apos;s Men&apos;s Concert Choir and took the name Singing Hoosiers in 1950. Within a few years, tours carried its music to service members and audiences far beyond Indiana. At home, roadshows turned the group into IU&apos;s Ambassadors of Song.</p><Link href="/history" className="text-link">Read the full story</Link></article>
        <aside className="history-card"><span className="history-year">1950</span><p>George Krueger reshapes the Men&apos;s Concert Choir into the Singing Hoosiers.</p><span className="source-note">From Roland Fisher&apos;s 2009 dissertation</span></aside>
      </section>
      <section className="alumni-mosaic" aria-label="Singing Hoosiers people and memories">
        <figure><Image src={siteAsset("/archive/alex-dlugosz.jpg")} alt="Singing Hoosiers member Alex Dlugosz performing" fill sizes="33vw"/><figcaption>Onstage memories</figcaption></figure>
        <figure><Image src={siteAsset("/archive/historical-1967-1970.jpg")} alt="Two Singing Hoosiers alumni smiling together at a reunion" fill sizes="33vw"/><figcaption>The friendships last</figcaption></figure>
        <figure><Image src={siteAsset("/archive/teresa-fowler.jpg")} alt="Singing Hoosiers member Teresa Fowler performing" fill sizes="33vw"/><figcaption>Every generation adds a voice</figcaption></figure>
      </section>
      <section className="preview-grid">
        <Link className="preview-card" href="/roadshows"><p className="eyebrow">Roadshow atlas</p><h3>Every stop tells a story.</h3><p>Explore concerts, assemblies, tours, sponsors, venues, and the towns that welcomed the Singing Hoosiers.</p><span className="data-tag">Explore roadshows from 1948 to 2012</span></Link>
        <Link className="preview-card" href="/song-library"><p className="eyebrow">Song library</p><h3>Find the song you still hum.</h3><p>Search the archive by title, year, medley, or concert program, including recordings still waiting to be identified.</p><span className="data-tag">Search {playable} playable tracks</span></Link>
        <Link className="preview-card" href="/concerts"><p className="eyebrow">Concert archive</p><h3>Watch the whole performance again.</h3><p>Return to Chimes of Christmas and Spring Concert performances preserved from the alumni video archive.</p><span className="data-tag">6 concert programs · 7 videos · 2011 to 2014</span></Link>
        <Link className="preview-card newsletter-preview" href="/newsletters"><div><p className="eyebrow">Newsletters</p><h3>Open the alumni mailbox.</h3><p>Read past issues, reunion news, profiles, tour updates, and stories from across the decades.</p><span className="data-tag">Browse the newsletter archive</span></div><Image src={siteAsset("/archive/old-sh-logo.jpg")} alt="Historic black and white Singing Hoosiers logo" width={280} height={240}/></Link>
      </section>
      <Footer />
    </main>
  );
}
