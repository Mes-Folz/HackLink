<div align="center">
  <img src="public/hacklink-icon.png" alt="HackLink app icon" width="160">
  <h1>HackLink</h1>
  <p><strong>Connect. Compete. Collaborate.</strong></p>
  <p>A community for Iloilo's developers, designers, students, and hackathon organizers.</p>
  <p>
    <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js">
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?logo=react">
    <img alt="TypeScript 5.6" src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript">
    <img alt="Tailwind CSS 3.4" src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss">
  </p>
</div>

## About

HackLink helps the local hackathon community connect, share work, find Guilds, and discover events. The initial product is focused on Iloilo, with the option to expand to other regions later.

> **Project status:** This is an early UI prototype. People, posts, Guilds, and events shown in the app are illustrative sample content. Preview interactions are temporary and are not saved. Authentication, persistent storage, and production backend features are not implemented yet.

## Current preview

- Community home with sample posts and comments
- Explore page with sample members, Guilds, and events
- Guild and hackathon preview pages
- Notifications preview
- Responsive navigation for mobile and desktop
- Dark black-and-red visual theme

## Tech stack

| Area | Technology |
| --- | --- |
| Framework and routing | Next.js 16 App Router |
| UI | React 19 |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Fonts | Inter, Space Grotesk, and JetBrains Mono |

## Getting started

**Requirements:** Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/Mes-Folz/HackLink.git
cd HackLink
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run a production build with:

```bash
npm run build
```

The current UI prototype does not require environment variables. `.env.example` contains placeholders for planned database and authentication work; keep real secrets in `.env.local` and never commit them.

## Product scope

- Iloilo is the initial supported region; allowed areas are maintained in [`src/config/regions.ts`](src/config/regions.ts).
- Location is an area selection, not GPS tracking.
- Online hackathon events are supported.
- Messaging, recruitment posts, advanced portfolios, rankings, and recommendations are out of scope for the current MVP.

## Project structure

```text
src/
  app/            Next.js routes and shared styles
  components/     App shell and reusable UI components
  config/         Region settings and illustrative preview content
public/           Static assets, including the app icon
```
