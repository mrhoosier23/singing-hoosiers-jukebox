import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Header } from '../site-chrome';
import styles from './concerts.module.css';

export const metadata: Metadata = {
  title: 'Concert Archive',
  description:
    'Watch Singing Hoosiers Chimes of Christmas and Spring Concert performances from the alumni archive.',
};

const concerts = [
  {
    year: '2014',
    series: 'Spring Concert',
    title: 'Spring Concert 2014',
    videoId: 'GyON9EHkQRE',
  },
  {
    year: '2013',
    series: 'Spring Concert',
    title: 'Spring Concert 2013',
    videoId: '_6UdRp70o0k',
  },
  {
    year: '2013',
    series: 'Chimes of Christmas',
    title: 'Chimes of Christmas 2013',
    videoId: 'QKQqqT8MZlk',
  },
  {
    year: '2012',
    series: 'Chimes of Christmas',
    title: 'Chimes of Christmas 2012',
    videoId: 'jQ5mO2icLv4',
  },
  {
    year: '2012',
    series: 'Spring Concert',
    title: 'Spring Concert 2012 · Part 1',
    videoId: 'kfA-AqqS7qc',
  },
  {
    year: '2012',
    series: 'Spring Concert',
    title: 'Spring Concert 2012 · Part 2',
    videoId: 'ROYKVjZ3mfc',
  },
  {
    year: '2011',
    series: 'Chimes of Christmas',
    title: 'Chimes of Christmas 2011',
    videoId: 'tTjdcrj0hpI',
  },
];

export default function ConcertsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="eyebrow">Full performances · 2011 to 2014</p>
        <h1>
          Take your seat.<br />
          <em>The concert is starting.</em>
        </h1>
        <p>
          Return to full Singing Hoosiers performances from the alumni archive, including
          Chimes of Christmas and Spring Concert programs. The 2012 Spring Concert is preserved
          across two video parts, kept together here as one concert.
        </p>
        <div className="page-stats" aria-label="Concert archive overview">
          <span><b>6</b>concert programs</span>
          <span><b>7</b>video parts</span>
          <span><b>4</b>years represented</span>
          <span><b>2</b>concert traditions</span>
        </div>
      </section>

      <section className={styles.archive} aria-labelledby="concert-archive-heading">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">Watch the archive</p>
            <h2 id="concert-archive-heading">Full concerts, preserved together.</h2>
          </div>
          <p>
            Choose a performance below. Each video plays directly from the Singing Hoosiers
            video archive on YouTube and can be expanded to full screen.
          </p>
        </div>

        <div className={styles.grid}>
          {concerts.map((concert) => (
            <article className={styles.card} key={concert.videoId}>
              <div className={styles.player}>
                <iframe
                  src={`https://www.youtube.com/embed/${concert.videoId}`}
                  title={`Singing Hoosiers ${concert.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className={styles.cardCopy}>
                <span className={styles.year}>{concert.year}</span>
                <div>
                  <p>{concert.series}</p>
                  <h3>{concert.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.preservationNote}>
        <p className="eyebrow">A living video archive</p>
        <h2>More concerts can join this shelf.</h2>
        <p>
          If you have another Singing Hoosiers concert recording, program, photograph, or
          memory connected to one of these performances, share it with the alumni archive so
          the record can keep growing.
        </p>
        <Link className="primary-button" href="/contribute">Share with the archive</Link>
      </section>
      <Footer />
    </main>
  );
}
