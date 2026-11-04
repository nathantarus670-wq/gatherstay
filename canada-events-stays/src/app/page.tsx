import Link from "next/link";
import EventCard from "@/components/EventCard";
import HotelCard from "@/components/HotelCard";
import { events, hotels } from "@/lib/data";

export default function Home() {
  return <>
    <section className="hero"><div className="container">
      <div className="eyebrow">Discover more of Canada</div>
      <h1>Your next great event.<br/>Your stay, sorted.</h1>
      <p>Find concerts, festivals and experiences, then discover places to stay close to the action — all in one place.</p>
      <form className="searchbar" action="/events"><input name="city" placeholder="Where do you want to go? e.g. Toronto" aria-label="City"/><input name="date" type="date" aria-label="Event date"/><button className="btn">Find events</button></form>
      <p style={{fontSize:12,marginTop:12}}>Launching city by city across Canada.</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="section-head"><div><div className="eyebrow">What's happening</div><h2>Events worth travelling for</h2><p className="muted">Explore experiences in Canada's favourite cities.</p></div><Link className="btn secondary" href="/events">All events</Link></div>
      <div className="grid">{events.map(e=><EventCard key={e.id} event={e}/>)}</div>
    </div></section>
    <section className="section" style={{background:"#f1f6f2"}}><div className="container">
      <div className="section-head"><div><div className="eyebrow">Stay nearby</div><h2>Places to make the most of it</h2><p className="muted">Accommodation examples for the demo experience.</p></div><Link className="btn secondary" href="/hotels">Explore stays</Link></div>
      <div className="grid">{hotels.map(h=><HotelCard key={h.id} hotel={h}/>)}</div>
    </div></section>
  </>;
}
