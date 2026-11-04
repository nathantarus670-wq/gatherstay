# GatherStay — Canada events & accommodation marketplace

A starter Next.js application for a Canadian event ticketing and hotel-booking marketplace. Livestreaming is intentionally excluded.

## Current status

This repository is a **working UI and architecture starter**, not a production booking/payment system.

Included:
- Responsive homepage and navigation
- Event discovery and event detail pages
- Hotel discovery and property detail pages
- CAD formatting and sample Canadian listings
- Initial Supabase/PostgreSQL schema with conservative RLS policies
- Partner information page

Not yet connected:
- Real customer authentication
- Organizer and hotel partner dashboards
- Live event inventory and ticket checkout
- Payment gateway and verified webhooks
- QR ticket issuance and scanner
- Live hotel inventory, reservation supplier and cancellations
- Partner payouts, tax calculation and production admin tools

Demo listings and prices are illustrative only. No real tickets or hotel reservations can be purchased from this starter.

## 1. Run locally

Install Node.js 20 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The app runs with sample data even before Supabase is configured.

## 2. Create the GitHub repository

1. Create a new empty repository on GitHub, for example `gatherstay`.
2. Extract this ZIP file.
3. Open a terminal in the extracted folder.
4. Run:

```bash
git init
git add .
git commit -m "Initial GatherStay marketplace starter"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gatherstay.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## 3. Connect Supabase

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Copy the project URL and anon/public key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Never put a Supabase service-role key or payment secret in a `NEXT_PUBLIC_` variable or commit secrets to GitHub.

## 4. Deploy

Import the GitHub repository into Vercel. Add the two Supabase environment variables in the Vercel project settings, then deploy.

## 5. Recommended build sequence

1. Authentication, profile creation and role management.
2. Organizer onboarding and event CRUD.
3. Ticket inventory reservations using database transactions.
4. Payment checkout, signed webhooks and idempotency.
5. QR ticket issuance, secure validation and staff scanner.
6. Hotel partner onboarding, room inventory and date-based rates.
7. Hotel supplier integration or direct partner reservation engine.
8. Cancellation/refund workflows, commissions, partner payouts and admin reports.
9. Security, accessibility, tax/legal review, monitoring and launch testing.

## Important launch requirements

- Confirm the payment provider accepts your actual business jurisdiction and marketplace model.
- Use a payment provider's marketplace/connected-account product where required for organizer and hotel payouts.
- Confirm applicable federal and provincial privacy, consumer-protection, tax and accessibility obligations.
- Obtain hotel inventory and rates from contracted partners or an authorized provider. Do not scrape booking sites.
- Never claim a booking or ticket is confirmed until the relevant inventory and payment steps have been verified.
