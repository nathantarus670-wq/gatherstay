import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GatherStay | Events & stays across Canada",
  description: "Discover Canadian events and find a place to stay nearby."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <header className="header"><div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Link className="brand" href="/">gather<span>stay</span></Link>
      <nav className="nav"><Link href="/events">Events</Link><Link href="/hotels">Hotels</Link><Link href="/partners">For partners</Link><Link className="btn" href="/events">Explore Canada</Link></nav>
    </div></header>
    {children}
    <footer className="footer"><div className="container" style={{display:"flex",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
      <div><div className="brand">gather<span style={{color:"#91c8a8"}}>stay</span></div><p>Good events. Great places to stay.</p></div>
      <small>Demo marketplace · Prices shown in CAD · © {new Date().getFullYear()} GatherStay</small>
    </div></footer>
  </body></html>;
}
