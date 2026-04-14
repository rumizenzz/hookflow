# Hookflow

**A lightweight webhook and API pipeline builder. Connect triggers to actions and automate your workflows.**

[Try it live](https://hookflow-app.netlify.app)

## The Problem

Developers constantly need to wire up webhooks, API calls, and automated workflows. Tools like Zapier are powerful but overkill for simple integrations, and building custom webhook handlers from scratch is tedious.

Hookflow lets you create trigger-to-action pipelines in seconds, with real-time execution logs.

## Features

- **Three trigger types:** Manual button, incoming webhook URL (auto-generated), scheduled (cron)
- **Three action types:** HTTP request (GET/POST/PUT/DELETE), data logging, email notification
- **Real-time execution logs** with status, timing, and error details
- **Flow dashboard** with enable/disable toggles for each flow
- **Webhook URLs** -- each flow gets a unique endpoint for receiving external events

## How It Works

```
Trigger (webhook / manual / schedule)
    |
    v
  Flow Engine (executes action)
    |
    v
Action (HTTP request / log / email)
    |
    v
Execution Log (success/failure, timing, details)
```

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **In-memory store** (MVP) -- designed for Supabase integration
- Deployed on **Netlify**

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/rumizenzz/hookflow.git
cd hookflow
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click "Open Dashboard" to start creating flows.

## API

### Create a flow
```bash
POST /api/flows
{ "name": "My Flow", "trigger": { "type": "webhook" }, "action": { "type": "log" } }
```

### Trigger a webhook
```bash
POST /api/webhook/{flow-id}
{ "any": "json payload" }
```

### Run a flow manually
```bash
POST /api/flows/{flow-id}/run
```

### View execution logs
```bash
GET /api/flows/{flow-id}/logs
```

## About

Hi, I'm **rumizenzz**. I built Hookflow because I kept needing simple webhook-to-action pipelines and everything out there was either too complex or too expensive for basic use cases. Sometimes you just want "when X happens, do Y" without a 50-step setup wizard.

I build fast using AI-assisted development tools like Claude Code -- but every architectural decision, every feature, and every deployment is mine. AI helps me move faster, not think less.

## License

MIT -- see [LICENSE](LICENSE) for details.
