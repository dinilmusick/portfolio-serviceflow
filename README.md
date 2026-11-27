# ServiceFlow

ServiceFlow is the first portfolio application in the Income project: a polished service-business operating dashboard for offers, bookings, customers and revenue.

## Architecture

```
tpl-saas-nextjs patterns (reference)
          ↓
      Skipo model
          ↓
   Floks UI primitives
          ↓
  Kloks service contract
          ↓
    ServiceFlow domain
```

The application is fresh code. No tpl-saas-nextjs source files are copied into this repository.

The SaaS template was inspected as a MIT-licensed reference for proven patterns such as dashboard navigation, teams, subscriptions, CRUD flows and activity-oriented product structure. Canonical reusable UI comes from Floks; the booking boundary uses the Kloks `ServiceFacade` contract.

## Portfolio surfaces

- Overview dashboard with revenue, booking and service-mix signals
- Services catalogue
- Booking list and live booking creation
- Customer CRM view
- Workspace settings and theme switching
- Responsive desktop/tablet/mobile layout

## Development

```bash
npm install
npm run dev
npm run check
```

This repo is intended as a demonstrable client-delivery foundation, not a production billing or booking platform.

## Provenance

Reusable dependency sources:

- Skipo: https://github.com/dinilmusick/Skipo
- Floks: https://github.com/dinilmusick/Floks
- Kloks: https://github.com/dinilmusick/Kloks
- Reference template: https://github.com/dinilmusick/tpl-saas-nextjs
