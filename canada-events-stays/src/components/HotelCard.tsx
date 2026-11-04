import Link from "next/link";
import { HotelItem, cad } from "@/lib/data";

export default function HotelCard({ hotel }: { hotel: HotelItem }) {
  return <Link href={`/hotels/${hotel.id}`} className="card">
    <img src={hotel.image} alt="" />
    <div className="card-body">
      <span className="tag">★ {hotel.rating.toFixed(1)} guest rating · Demo listing</span>
      <h3>{hotel.name}</h3>
      <p className="muted">{hotel.city}, {hotel.province} · {hotel.address}</p>
      <div className="card-foot"><span className="muted">Indicative nightly rate</span><span className="price">{cad(hotel.priceFrom)}</span></div>
    </div>
  </Link>;
}
