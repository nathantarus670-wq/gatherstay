export type EventItem = {
  id: string; slug: string; title: string; category: string; city: string;
  province: string; venue: string; date: string; priceFrom: number;
  description: string; image: string;
};

export const events: EventItem[] = [
  {
    id: "evt-001", slug: "toronto-summer-music-fest", title: "Toronto Summer Music Festival",
    category: "Music", city: "Toronto", province: "ON", venue: "Harbourfront Centre",
    date: "2027-06-19T18:00:00-04:00", priceFrom: 49,
    description: "An outdoor evening of live music, local food vendors and waterfront views. Discover emerging Canadian artists and headline performances.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1400&q=85"
  },
  {
    id: "evt-002", slug: "vancouver-food-and-culture-weekend", title: "Vancouver Food & Culture Weekend",
    category: "Food & Drink", city: "Vancouver", province: "BC", venue: "Granville Island",
    date: "2027-07-10T11:00:00-07:00", priceFrom: 25,
    description: "Explore food, makers, performances and neighbourhood culture from across British Columbia.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=85"
  },
  {
    id: "evt-003", slug: "montreal-tech-summit", title: "Montreal Future Tech Summit",
    category: "Conference", city: "Montreal", province: "QC", venue: "Palais des congrès",
    date: "2027-09-15T09:00:00-04:00", priceFrom: 89,
    description: "A one-day gathering for builders, founders, researchers and technology leaders.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=85"
  }
];

export type HotelItem = {
  id: string; name: string; city: string; province: string; address: string;
  rating: number; priceFrom: number; description: string; image: string;
};

export const hotels: HotelItem[] = [
  {
    id: "hotel-001", name: "The Harbour House", city: "Toronto", province: "ON",
    address: "Waterfront district, Toronto", rating: 4.6, priceFrom: 189,
    description: "Contemporary rooms close to waterfront attractions and downtown venues.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85"
  },
  {
    id: "hotel-002", name: "Pacific Garden Hotel", city: "Vancouver", province: "BC",
    address: "Downtown Vancouver", rating: 4.4, priceFrom: 165,
    description: "Comfortable city stay with easy access to dining, transit and local experiences.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85"
  },
  {
    id: "hotel-003", name: "Old Port Boutique Stay", city: "Montreal", province: "QC",
    address: "Old Montreal", rating: 4.7, priceFrom: 210,
    description: "Boutique accommodation near historic streets, restaurants and conference venues.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85"
  }
];

export const cad = (amount: number) => new Intl.NumberFormat("en-CA", {
  style: "currency", currency: "CAD", maximumFractionDigits: 0
}).format(amount);

export const formatEventDate = (value: string) =>
  new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
