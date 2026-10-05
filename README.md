# Sydney’s Beauty Lounge

A branded website for Sydney’s Beauty Lounge. Square remains the system of record for appointments, customers, invoices, payments, and reminders. This site is the public-facing layer: brand, services storytelling, events, gallery, and SEO.

```
CUSTOM WEBSITE  →  brand / gallery / services / events / SEO
        ↓
     SQUARE     →  appointments / customers / invoices / payments / communications
```

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What Square already does

Do not duplicate these on the website:

- Appointment scheduling and staff availability
- Customer profiles and history
- Confirmations, reminders, and rescheduling
- Deposits, prepayments, invoices, and card processing
- No-show and cancellation policies as configured in Square

The `/book` page embeds Sydney’s Square Appointments flow:

`https://book.squareup.com/appointments/MLSNCXNS7XG1F/location/LBRYDNMWG7G70/services`

If Square’s embed code from **Appointments → Online Booking → Get embed code** is available, paste it into `SQUARE_BOOKING_EMBED_HTML`. The page always offers a same-tab/new-window fallback so booking never depends on a fake calendar.

Retail product names and prices currently shown on Services come from the live Square Online catalog. Appointment service names and prices appear automatically once `SQUARE_ACCESS_TOKEN` is set. Until then, the site points visitors to Square rather than inventing a menu.

## Connect Square (operations stay in Square)

1. Create a Square application in the [Developer Dashboard](https://developer.squareup.com/apps).
2. Add the production access token as `SQUARE_ACCESS_TOKEN` on the host. Never put it in `NEXT_PUBLIC_*` variables or client code.
3. Confirm `SQUARE_LOCATION_ID=LBRYDNMWG7G70` and `SQUARE_MERCHANT_ID=MLSNCXNS7XG1F`.
4. Optional OAuth: set `SQUARE_APPLICATION_ID`, `SQUARE_APPLICATION_SECRET`, and `SQUARE_OAUTH_REDIRECT_URL`, then visit `/api/square/oauth`.
5. Optional webhooks: point Square at `/api/square/webhooks` and set `SQUARE_WEBHOOK_SIGNATURE_KEY`.
6. Optional catalog JSON for debugging: `GET /api/square/catalog`.

Sydney should keep editing services, prices, hours, staff, and policies in Square. The website reads or links; it does not become a second admin.

## Event inquiries

`/events` collects name, email, phone, preferred date, event type, guest count, services of interest, and notes. Delivery:

- Saved under `data/inquiries.json` (gitignored)
- Emailed when `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` are set
- Optionally synced to a Square customer if the API token is present

Confirmed events should still be invoiced in Square.

## Business details

Phone, address, and social URLs are environment variables so they can be filled from Sydney’s Square profile without guessing. Leave them blank until confirmed.

## Scripts

- `npm run dev` — local site
- `npm test` — inquiry and catalog helper tests
- `npm run lint` — Next.js lint
- `npm run build` — production build
