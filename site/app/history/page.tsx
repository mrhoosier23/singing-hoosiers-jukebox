/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Header } from '../site-chrome';

export const metadata:Metadata={title:'Our Story',description:'Explore the history and current chapter of the Indiana University Singing Hoosiers, from early roots and roadshows to the 75th anniversary era.'};

const moments = [
  ['1893','Indiana University forms the Men’s Glee Club, the earliest root of the ensemble.'],
  ['1948','The group becomes the Men’s Concert Choir under director George Krueger.'],
  ['1950','The name Singing Hoosiers arrives, joining popular American song with the sound of a collegiate choir.'],
  ['1952','The Singing Hoosiers and Hoosier Queens begin USO tours. Their travels eventually include the Far East, Europe, Greenland, the North Atlantic, the Caribbean, and military bases across the United States.'],
  ['1963','Robert Stoll becomes director and reshapes the roadshow in the form of a Broadway production, with more complex movement for the Varsity Singers.'],
  ['1964','Chimes of Christmas and the Spring Concert become the two annual campus traditions.'],
  ['1967','Homecoming and Little 500 variety shows bring the ensemble together with guests including Bob Hope and Al Cobine.'],
  ['1973','A long era of symphonic collaborations begins, including frequent work with Erich Kunzel and the Cincinnati Pops.'],
  ['1995','Under Michael Schwartzkopf, the Singing Hoosiers appear with the Cincinnati Pops and Mel Tormé in a Christmas program broadcast on PBS.'],
  ['2009','The story documented by Roland Fisher reaches the Indiana Inaugural Ball, nearly sixty years after the Singing Hoosiers name began.'],
  ['2012–15','Steve Zegree leads the Singing Hoosiers and Vocal Jazz Ensemble I, bringing his internationally recognized work in vocal jazz, arranging, and popular music education to Bloomington.'],
  ['2021 & 2025','Under director Chris Albanese, the Singing Hoosiers are invited to perform at two American Choral Directors Association National Conferences, placing the ensemble on one of the country’s major choral stages.'],
  ['2025','The 75th anniversary season culminates in “Within the Stardust of a Song,” a retrospective Spring Concert at the Musical Arts Center with a 40-piece orchestra and alumni returning for the traditional Battle Hymn of the Republic.'],
  ['2026','The Spring Concert “American Snapshots” keeps the tradition moving forward with music across eras of American life, alongside featured performances by ResoluSHion and SHAcapella.'],
];

const todayFacts = [
  ['About 100 singers','The 2025 national ACDA profile described an ensemble of approximately 100 singers representing more than 20 IU majors.'],
  ['Open across IU','Any Indiana University student, regardless of major, may audition for the Singing Hoosiers.'],
  ['Popular music, broadly defined','Today’s repertoire continues to span the Great American Songbook, jazz, Broadway, and contemporary hits, with choreography as part of the ensemble’s performance identity.'],
  ['Still ambassadors of song','IU describes the Singing Hoosiers as international ambassadors whose history includes performances in 26 states and 18 countries.'],
];

export default function HistoryPage(){
  return <main>
    <Header/>
    <section className="page-hero history-hero">
      <p className="eyebrow">Our story · 1893 to today</p>
      <h1>Always moving.<br/><em>Always together.</em></h1>
      <p>What began as a men’s concert choir became a traveling American show choir, a campus tradition, and a family that continues long after graduation. The archive now carries the story beyond the 2009 dissertation and into the ensemble’s 75th anniversary era.</p>
    </section>

    <section className="history-intro">
      <blockquote>“Ambassadors of Song” was more than a nickname. Roadshows, tours, annual concerts, and shared work turned performance into a form of service to Indiana University.</blockquote>
      <div>
        <p>The historical spine of this timeline is adapted from Roland Donald Fisher’s 2009 dissertation, <i>The History of the Indiana University Singing Hoosiers Choral Ensemble</i>. Recent milestones are drawn from current Jacobs School of Music materials, ACDA records, concert coverage, and the alumni archive.</p>
        <div className="history-source-links">
          <a className="text-link" href="https://drive.google.com/file/d/1EebjRzauJMaWD7z1iq3Wk8xDf1qWu9lH/view" target="_blank" rel="noreferrer">Read Fisher’s dissertation <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="https://www.music.indiana.edu/degrees-programs/ensembles/index.html" target="_blank" rel="noreferrer">Current Jacobs ensemble profile <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="https://music.indiana.edu/faculty/current/albanese-christopher.html" target="_blank" rel="noreferrer">Chris Albanese faculty profile <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>

    <section className="history-now" aria-labelledby="history-now-heading">
      <div className="history-now-copy">
        <p className="eyebrow">The ensemble now</p>
        <h2 id="history-now-heading">The sound changed.<br/>The idea kept traveling.</h2>
        <p>The modern Singing Hoosiers remain a large, auditioned popular-vocal ensemble inside the Jacobs School of Music while drawing students from across Indiana University. Grammy-nominated recordings, national conference invitations, choreography, small-group features, and an unusually broad repertoire all sit inside the same tradition alumni recognize.</p>
        <p>Chris Albanese serves as Director of the Singing Hoosiers and Pam and Jack Burks Associate Professor of Choral Conducting. Under his direction, the ensemble appeared at the 2021 and 2025 ACDA National Conferences and has collaborated with artists including Sylvia McNair and Sandi Patty.</p>
      </div>
      <div className="history-now-facts">
        {todayFacts.map(([title,text])=><article key={title}><strong>{title}</strong><p>{text}</p></article>)}
      </div>
      <figure className="history-now-photo">
        <img src="https://drive.google.com/thumbnail?id=1YSOyDlKQMjEHXZRgv4PH2xp7VPcUYXJu&sz=w1800" alt="Alumni gathering during the Singing Hoosiers 75th anniversary weekend in 2025"/>
        <figcaption><b>75th anniversary weekend · 2025</b><span>One of the recent photographs now gathered in the alumni photo archive.</span></figcaption>
      </figure>
    </section>

    <section className="timeline" aria-label="Singing Hoosiers history timeline">
      {moments.map(([year,text],index)=><article key={year}><div className="timeline-number">{String(index+1).padStart(2,'0')}</div><div className="timeline-year">{year}</div><p>{text}</p></article>)}
    </section>

    <section className="history-coda">
      <p className="eyebrow">The next measure</p>
      <h2>The archive is not finished.</h2>
      <p>Fisher’s research gives us a strong spine. Alumni memories, programs, photographs, recordings, and corrections turn that history into a living record, including the chapters still being written.</p>
      <div className="history-coda-actions"><Link className="primary-button" href="/photos">See the photo archive</Link><Link className="text-link" href="/contribute">Share what you remember</Link></div>
    </section>
    <Footer/>
  </main>
}
