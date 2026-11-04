import { notFound } from "next/navigation";
import { hotels, cad } from "@/lib/data";

export default async function HotelDetail({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const hotel=hotels.find(h=>h.id===id);
  if(!hotel) notFound();
  return <main className="detail"><div className="container">
    <img src={hotel.image} alt={hotel.name}/>
    <div className="detail-layout"><div><span className="tag">★ {hotel.rating.toFixed(1)} · Demo property</span><h1 style={{fontSize:42}}>{hotel.name}</h1><p className="muted">{hotel.address}, {hotel.city}, {hotel.province}</p><p style={{lineHeight:1.8}}>{hotel.description}</p><h2>About this stay</h2><p className="muted">This is sample content. Real property details, room availability, policies and rates must be supplied by verified hotel partners or an authorized inventory provider.</p></div>
    <aside className="panel"><div className="eyebrow">Indicative price</div><h2>{cad(hotel.priceFrom)} <small className="muted">/ night</small></h2>
      <form className="form" action="/booking-demo"><label>Check-in<input name="checkin" type="date" required/></label><label>Check-out<input name="checkout" type="date" required/></label><label>Guests<select name="guests"><option>1</option><option>2</option><option>3</option><option>4</option></select></label><input type="hidden" name="hotel" value={hotel.name}/><button className="btn">Check booking demo</button></form>
      <p className="notice" style={{marginTop:14}}>Demo only: this form does not check live availability or create a reservation.</p>
    </aside></div>
  </div></main>;
}
