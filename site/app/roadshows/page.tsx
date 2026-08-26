import type { Metadata } from 'next';
import roadshowData from '../data/roadshows.json';
import { Footer, Header } from '../site-chrome';
import { RoadshowExplorer } from './roadshow-explorer';

export const metadata:Metadata={title:'Roadshows',description:'Explore nearly two thousand Singing Hoosiers roadshow records across decades of tours, concerts, schools, conventions, and community performances.'};

export default function RoadshowsPage(){
  const years=roadshowData.map((item)=>item.year);
  const cleanCities=new Set(roadshowData.filter((item)=>/^[A-Za-z .'-]+$/.test(item.city)).map((item)=>`${item.city}, ${item.state}`));
  return <main><Header/><section className="page-hero roadshow-hero"><p className="eyebrow">Roadshow atlas</p><h1>Where did <em>we sing?</em></h1><p>From school gyms and church sanctuaries to conventions and concert halls, the roadshow archive traces decades of Indiana University’s Ambassadors of Song.</p><div className="page-stats"><span><b>{roadshowData.length.toLocaleString()}</b> indexed performances</span><span><b>{Math.min(...years)}–{Math.max(...years)}</b> archive span</span><span><b>{cleanCities.size.toLocaleString()}</b> places recorded</span></div></section><RoadshowExplorer data={roadshowData}/><section className="source-strip"><p><b>About this data:</b> These entries come from the Singing Hoosiers Road Show Database. Obvious OCR spacing and character errors in place names are normalized for display, while the source spreadsheet remains untouched. Records that still cannot be confidently identified are labeled as archival leads rather than guessed.</p><a href="https://docs.google.com/spreadsheets/d/1YnlirZ9iEKMMo5lfHogIUFI78_f5oZWVCpE5MBgZSkE/edit" target="_blank" rel="noreferrer">View source spreadsheet ↗</a></section><Footer/></main>
}
