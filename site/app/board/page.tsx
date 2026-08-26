import type { Metadata } from 'next';
import { Footer, Header } from '../site-chrome';

export const metadata: Metadata = { title: 'Alumni Council', description: 'Meet the Singing Hoosiers Alumni Council and send the board a message.' };

const officers = [
  ['President','Audie Deinlein Bruetman',"BFA ’18 · Singing Hoosiers 2014–2018"],
  ['Alumni Outreach','Lucia Walker',"BS ’25 · Singing Hoosiers 2021–2025"],
  ['Development','Stephen Hunt',"BA ’95 · Singing Hoosiers 1990–1995"],
  ['Student Outreach','Heather Narducci',"BM ’90 · Singing Hoosiers 1987–1989"],
  ['Student Outreach','Sarah Harpring',"BA ’20 · Singing Hoosiers 2016–2020"],
  ['Communications','Kaycee Beck',"BS ’23 · Singing Hoosiers 2019–2023"],
  ['Treasurer','Warren Brodine',"BA ’90 · Singing Hoosiers 1987–1990"],
  ['Nominations','Kelly Perillo Brown',"BS ’03 · Singing Hoosiers 1999–2003"],
  ['Awards','Erin McCauley',"BA ’96 · Singing Hoosiers 1993–1995"],
  ['Immediate Past President','Andrew Wolverton',"BA ’14, MA ’22 · Singing Hoosiers 2010–2014"],
];

const members = [
  ['Deborah Jenkins Dalfonso','Singing Hoosiers 1990–1993'],
  ['Jill Mailander Lipien',"BA ’93 · Singing Hoosiers 1989–1993"],
  ['Anna Nappi','Singing Hoosiers 2021–2025'],
  ['Daniel Narducci',"BM ’90, MM ’14, DMA ’19 · Singing Hoosiers 1987–1989"],
  ['John Stevenson',"BS ’68 · Singing Hoosiers 1963–1968"],
  ['Alison Streeter','Singing Hoosiers 1993–1996'],
];

const email = 'singinghoosiersalumnicouncil@gmail.com';

export default function BoardPage(){return <main><Header/><section className="page-hero board-hero"><p className="eyebrow">Singing Hoosiers Alumni Council</p><h1>Alumni serving <em>the next generation.</em></h1><p>The council connects decades of Singing Hoosiers, supports current students, and helps preserve the stories, music, and friendships that outlast every final chord.</p></section><section className="board-section"><div className="board-heading"><div><p className="eyebrow">2026 council</p><h2>Meet your board</h2></div><p>This roster reflects the council’s July 2026 update. Personal contact information stays private; messages are routed through the shared council address.</p></div><div className="officer-grid">{officers.map(([role,name,years],i)=><article className={i===0?'president-card':''} key={`${role}-${name}`}><span>{role}</span><h3>{name}</h3><p>{years}</p></article>)}</div><h2 className="member-heading">Council members</h2><div className="member-grid">{members.map(([name,years])=><article key={name}><h3>{name}</h3><p>{years}</p></article>)}</div></section><section className="board-contact"><div><p className="eyebrow">Send the council a message</p><h2>We would love to hear from you.</h2><p>Questions, ideas, corrections, memories, and offers to help are all welcome. This button opens your email app with the council address filled in. Review your message there, then press Send.</p></div><a className="primary-button" href={`mailto:${email}?subject=Message%20for%20the%20Singing%20Hoosiers%20Alumni%20Council`}>Email the alumni council</a><a className="board-email" href={`mailto:${email}`}>{email}</a></section><Footer/></main>}
