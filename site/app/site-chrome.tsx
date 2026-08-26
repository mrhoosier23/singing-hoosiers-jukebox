import Image from 'next/image';
import Link from 'next/link';
import { siteAsset } from './site-path';

export function Header() {
  return <header className="site-header"><Link className="wordmark" href="/" aria-label="Singing Hoosiers Alumni Archive home"><Image className="wordmark-logo" src={siteAsset("/shac-logo-2025.png")} alt="" width={58} height={72}/><span><b>Singing Hoosiers</b><small>Alumni Archive</small></span></Link><nav aria-label="Main navigation"><Link href="/#listen">Listen</Link><Link href="/history">Our story</Link><Link href="/photos">Photos</Link><Link href="/roadshows">Roadshows</Link><Link href="/song-library">Song library</Link><Link href="/newsletters">Newsletters</Link><Link href="/board">Board</Link><Link className="nav-cta" href="/contribute">Share with us</Link></nav></header>;
}

export function Footer() {
  return <footer><div className="wordmark wordmark-light"><span className="footer-monogram">SH</span><span><b>Singing Hoosiers</b><small>Alumni Archive</small></span></div><p>Built for alumni, students, and everyone carrying the next measure.</p><div className="footer-links"><Link href="/board">Meet the alumni council</Link><Link href="/contribute">Add your voice to the archive</Link></div></footer>;
}
