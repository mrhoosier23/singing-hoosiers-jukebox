import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteAsset } from '../site-path';
import { Footer, Header } from '../site-chrome';

export const metadata:Metadata={title:'Newsletters',description:'Read archived Singing Hoosiers Alumni Council newsletters, profiles, tour updates, and reunion news.'};

const issues=[
  {title:'Alumni News, Winter 2020',date:'Winter 2020',url:'https://drive.google.com/file/d/1dACYVIbW5uIvNZj4NE-AQ7i5fLtHk320/view'},
  {title:'Hoosier History, October 2019',date:'October 2019',url:'https://drive.google.com/file/d/0BziDJ_2Vse1aV0dpbmpBeFp3d2U3bmNLNGVFQml5Yks4U2hB/view?resourcekey=0-uI5K_qAN1F65TzW_5-OmCA'},
  {title:'SHAC President Fall Letter',date:'Fall 2019',url:'https://drive.google.com/file/d/1jMo1RbehjCjB7YkHE_kNmj3hLXXWQ-vv/view'},
  {title:'Chimes 2019',date:'2019',url:'https://drive.google.com/file/d/13p9EZ20zcl6QdNoxAaGIkyNnbfPQflwU/view'},
  {title:'Alumni News',date:'June 2019',url:'https://drive.google.com/file/d/1tbTIuGM-Y_iUYb-fvSL07b1Pe8A50C0o/view'},
  {title:'Singing Hoosiers Florida Tour',date:'2019',url:'https://drive.google.com/file/d/1S5kvphX5rivdsnMLTE5o3eRRjsMhU-hJ/view'},
  {title:'Distinguished Alumni Banquet',date:'Archive issue',url:'https://drive.google.com/file/d/18PbR8biALLUBAJEr2hyF0sXLHzV3oubI/view'},
  {title:'Emily Sipes Alumni Profile',date:'Alumni profile',url:'https://drive.google.com/file/d/1Z-edcYaDUURuHk5GLWHfMbcqGsP0R8oY/view'},
  {title:'July Newsletter',date:'July issue',url:'https://drive.google.com/file/d/0BziDJ_2Vse1aNThyOG92bk5Da0J0WjQzRFBnT2RGblA0NUlZ/view?resourcekey=0-actj6N9LDC8f-0u4A-FbXg'},
  {title:'May Newsletter',date:'May issue',url:'https://drive.google.com/file/d/0BziDJ_2Vse1aSEU4b2ktbmZQVEVwYnJUclZ4VWN0S3VBQ2I4/view?resourcekey=0-wij7fXEMUgeCkW0nN6a2LA'},
];

export default function NewslettersPage(){return <main><Header/><section className="newsletter-hero"><div><p className="eyebrow">The alumni mailbox</p><h1>News worth <em>singing about.</em></h1><p>Revisit reunion notes, member profiles, tour stories, and dispatches from the Singing Hoosiers Alumni Council.</p></div><div className="newsletter-hero-art"><Image src={siteAsset("/archive/old-sh-logo.jpg")} alt="Historic Singing Hoosiers illustrated logo" width={430} height={380}/><span>From the SHAC archive</span></div></section><section className="newsletter-section"><div className="newsletter-heading"><div><p className="eyebrow">Past issues</p><h2>Read through the archive</h2></div><p>Each issue opens in Google Drive in a new tab. More years will be added as alumni help us locate them.</p></div><div className="newsletter-grid">{issues.map((issue,index)=><a className="newsletter-card" href={issue.url} target="_blank" rel="noreferrer" key={issue.title}><span className="issue-number">{String(index+1).padStart(2,'0')}</span><div><small>{issue.date}</small><h3>{issue.title}</h3><span className="read-issue">Read issue</span></div></a>)}</div></section><section className="newsletter-contribute"><Image src={siteAsset("/archive/original-logo.png")} alt="Historic Singing Hoosiers logo" width={180} height={180}/><div><p className="eyebrow">Help fill the shelf</p><h2>Have an issue we are missing?</h2><p>Send a scan, document, photograph, or memory. Even an incomplete issue can help rebuild the record.</p></div><Link className="primary-button" href="/contribute">Share an archive item</Link></section><Footer/></main>}
