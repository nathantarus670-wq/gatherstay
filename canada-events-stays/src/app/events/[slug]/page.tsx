import { notFound } from "next/navigation";
import Link from "next/link";
import { events, hotels, cad, formatEventDate } from "@/lib/data";

export default async function EventDetail({ params }: { params: Promise<{slug:string}> }) {
  const {slug} = await params;
  const event = events.find(e=>e.slug===slug);
  if (!event) notFound();
  const nearby = hotels.filter(h=>h.city===event.city);
  return <main className="detail"><div className="container">
    <img src={event.image} alt={event.title}/>
    <div className="detail-layout"><div>
      <span className="tag">{event.category}</span><h1 style={{fontSize:42}}>{event.title}</h1>
      <p className="muted">{event.city}, {event.province} · {event.venue} · {formatEventDate(event.date)}</p>
      <p style={{lineHeight:1.8}}>{event.description}</p>
      <h2>Stay close to the event</h2>
      {nearby.length ? nearby.map(h=><div key={h.id} className="panel" style={{marginBottom:12}}><strong>{h.name}</strong><p className="muted">{h.address} · from {cad(h.priceFrom)} / night</p><Link className="btn secondary" href={`/hotels/${h.id}`}>View stay</Link></div>) : <p className="muted">More accommodation partners coming soon in this city.</p>}
    </div><aside className="panel"><div className="eyebrow">Ticket information</div><h2>From {cad(event.priceFrom)}</h2><p className="muted">Sample listing for development preview.</p><div className="notice">Ticket checkout is a demo placeholder. No payment will be taken and no valid ticket is issued.</div><button className="btn" style={{width:"100%",marginTop:18}} disabled>Ticket sales coming soon</button></aside></div>
  </div></main>;
}
