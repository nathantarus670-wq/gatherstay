import EventCard from "@/components/EventCard";
import { events } from "@/lib/data";

export default async function EventsPage({ searchParams }: { searchParams: Promise<{city?:string}> }) {
  const params = await searchParams;
  const city = (params.city || "").toLowerCase();
  const filtered = events.filter(e => !city || e.city.toLowerCase().includes(city));
  return <main className="section"><div className="container">
    <div className="eyebrow">Explore Canada</div><h1>Discover events</h1><p className="muted">Find something memorable happening near your destination.</p>
    <form className="searchbar" action="/events"><input name="city" defaultValue={params.city} placeholder="Search by city"/><button className="btn">Search</button></form>
    <div className="grid" style={{marginTop:30}}>{filtered.map(e=><EventCard key={e.id} event={e}/>)}</div>
    {filtered.length===0 && <p>No demo events found for that city. Try Toronto, Vancouver or Montreal.</p>}
  </div></main>;
}
