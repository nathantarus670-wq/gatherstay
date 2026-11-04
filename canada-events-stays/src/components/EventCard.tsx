import Link from "next/link";
import { EventItem, cad, formatEventDate } from "@/lib/data";

export default function EventCard({ event }: { event: EventItem }) {
  return <Link href={`/events/${event.slug}`} className="card">
    <img src={event.image} alt="" />
    <div className="card-body">
      <span className="tag">{event.category}</span>
      <h3>{event.title}</h3>
      <p className="muted">{event.city}, {event.province} · {formatEventDate(event.date)}</p>
      <div className="card-foot"><span className="muted">Tickets from</span><span className="price">{cad(event.priceFrom)}</span></div>
    </div>
  </Link>;
}
