# LandedSafe

**Never Text "Landed Safe" Again**

LandedSafe is an aviation flight tracking and AI assistant platform. Real-time flight monitoring with automatic landing notifications via SMS.

## Features

- **Automatic Flight Tracking**: Monitor aircraft via ADS-B Exchange data
- **Landing Notifications**: SMS alerts when you land safely
- **AI Assistant**: Post-landing help via SMS (FBO lookup, ride comparison, weather)
- **Emergency Descent Detection**: Optional steep descent alerts
- **TCPA Compliant**: Full SMS consent management (STOP/START/HELP)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **SMS**: SIBT (Send It By Text)
- **Email**: Mailgun
- **Flight Data**: ADS-B Exchange (via RapidAPI)
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in:

- `POSTGRES_URL` - Neon database connection
- `RAPIDAPI_KEY` - ADS-B Exchange API key
- `SIBT_API_KEY` - Send It By Text API key
- `MAILGUN_API_KEY` - Mailgun API key
- `OPENAI_API_KEY` - OpenAI API key
- `CRON_SECRET` - Random secret for securing cron endpoints
- `NEXTAUTH_SECRET` - Random secret for NextAuth

### 3. Initialize Database

```bash
pnpm prisma generate
pnpm prisma db push
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Connect Neon database
5. Deploy

Vercel will automatically:
- Run `pnpm install`
- Execute `prisma generate`
- Deploy the app
- Set up cron job for flight monitoring (every minute)

## API Routes

- `POST /api/track/flight` - Start tracking a flight
- `POST /api/ai-chat/inbound` - SMS webhook (SIBT)
- `GET /api/cron/flight-monitor` - Flight monitoring cron job (secured)

## Database Schema

9 tables:
- `users` - User accounts (future)
- `aircraft` - User-owned aircraft
- `recipients` - SMS notification recipients
- `tracking` - Flight tracking sessions
- `sms_consent` - TCPA compliance
- `notification_log` - SMS/email delivery log
- `ai_conversations` - AI assistant chat history
- `fbo_emails` - FBO service requests
- `airports` - Airport database
- `fbos` - FBO directory

## Architecture

- **Frontend**: Static pages (landing, about, privacy/terms, tracking status)
- **Backend**: API routes for form submission, SMS webhooks, cron jobs
- **Database**: Postgres for tracking sessions, consent, notifications
- **Flight Monitoring**: Vercel Cron (every minute) polls ADS-B Exchange
- **SMS**: SIBT for inbound/outbound messages
- **Email**: Mailgun for FBO communications

## Business Model

- **Free Forever**: No premium tiers, no paid features
- **Future**: Ad-supported (like AirNav.com)

## Legal

- Privacy Policy & Terms: `/privacy-terms`
- Florida governing law
- Zero liability disclaimers
- Not FAA-approved
- Pilot judgment takes precedence

## Development

Created by Power Admin Solutions for the general aviation community.

## License

Proprietary
