/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ArchivePhoto } from '../data/photo-archive';

type Filter = 'all' | ArchivePhoto['year'];

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Open the whole box' },
  { key: '2025', label: '75th anniversary' },
  { key: '2024', label: '2024' },
  { key: '2023', label: '2023' },
  { key: 'historical', label: 'Earlier years' },
];

const PAGE_SIZE = 42;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function thumb(photo: ArchivePhoto) {
  return photo.localSrc ? `${basePath}${photo.localSrc}` : `https://drive.google.com/thumbnail?id=${photo.id}&sz=w1200`;
}

function full(photo: ArchivePhoto) {
  return photo.localSrc ? `${basePath}${photo.localSrc}` : `https://drive.google.com/thumbnail?id=${photo.id}&sz=w2400`;
}

function original(photo: ArchivePhoto) {
  return photo.localSrc ? `${basePath}${photo.localSrc}` : `https://drive.google.com/file/d/${photo.id}/view`;
}

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PhotoWall({ photos }: { photos: ArchivePhoto[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [active, setActive] = useState<ArchivePhoto | null>(null);

  const ordered = useMemo(() => order.map(i => photos[i]).filter(Boolean), [order, photos]);
  const filtered = useMemo(() => filter === 'all' ? ordered : ordered.filter(photo => photo.year === filter), [filter, ordered]);
  const shown = filtered.slice(0, visible);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return <>
    <div className="photo-controls" aria-label="Photo archive filters">
      <div className="photo-filters">
        {FILTERS.map(item => <button key={item.key} className={filter === item.key ? 'active' : ''} onClick={() => { setFilter(item.key); setVisible(PAGE_SIZE); }}>{item.label}</button>)}
      </div>
      <button className="shuffle-button" onClick={() => { setOrder(shuffled(order)); setVisible(PAGE_SIZE); }}>Shuffle the box</button>
    </div>

    <div className="photo-wall" aria-live="polite">
      {shown.map((photo, index) => <button className={`photo-tile photo-shape-${index % 7}`} key={photo.id} onClick={() => setActive(photo)} aria-label={`Open ${photo.alt}`}>
        <img src={thumb(photo)} alt={photo.alt} loading="lazy" decoding="async"/>
        <span><b>{photo.year === 'historical' ? 'From the archive' : photo.year}</b><small>{photo.sourceLabel}</small></span>
      </button>)}
    </div>

    {visible < filtered.length && <div className="photo-more"><button className="primary-button" onClick={() => setVisible(value => value + PAGE_SIZE)}>Keep wandering <span aria-hidden="true">↓</span></button><p>{filtered.length - visible} more photographs in this view</p></div>}

    {active && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Archive photograph viewer" onClick={() => setActive(null)}>
      <div className="photo-lightbox-card" onClick={event => event.stopPropagation()}>
        <button className="photo-close" onClick={() => setActive(null)} aria-label="Close photograph">×</button>
        <img src={full(active)} alt={active.alt}/>
        <div className="photo-lightbox-meta">
          <div><p className="eyebrow">{active.year === 'historical' ? 'Earlier archive' : active.year}</p><strong>{active.sourceLabel}</strong></div>
          {!active.localSrc && <a href={original(active)} target="_blank" rel="noreferrer">Open original in Drive <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </div>}
  </>;
}
