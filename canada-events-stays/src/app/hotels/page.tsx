import HotelCard from "@/components/HotelCard";
import { hotels } from "@/lib/data";

export default async function HotelsPage({ searchParams }: { searchParams: Promise<{city?:string}> }) {
  const params = await searchParams;
  const city=(params.city||"").toLowerCase();
  const filtered=hotels.filter(h=>!city||h.city.toLowerCase().includes(city));
  return <main className="section"><div className="container">
    <div className="eyebrow">Find your stay</div><h1>Hotels across Canada</h1><p className="muted">Explore sample stays near popular destinations and events.</p>
    <form className="searchbar" action="/hotels"><input name="city" defaultValue={params.city} placeholder="Search city"/><button className="btn">Search</button></form>
    <div className="grid" style={{marginTop:30}}>{filtered.map(h=><HotelCard key={h.id} hotel={h}/>)}</div>
    {filtered.length===0&&<p>No demo hotels found. Try Toronto, Vancouver or Montreal.</p>}
  </div></main>;
}
