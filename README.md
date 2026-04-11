# Word Association

A daily word puzzle game where players chain words through compound-word associations. Each day presents a new sequence of five words — the first is revealed, and players guess the rest by identifying the compound word or phrase that links each pair.

For example: **cat** → **fish** → **tank** → **top** → **gun** (catfish, fishtank, tanktop, topgun).

## How It Works

- A new puzzle is available each day
- The first word and the first letter of each subsequent word are given as hints
- Players type their guesses using the on-screen keyboard or their physical keyboard
- Wrong guesses trigger a shake animation and increment the attempt counter
- Progress is saved automatically so players can return to an in-progress puzzle
- Stats track total completions, attempt counts, and history over time

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Charts:** D3.js
- **Analytics:** Vercel Analytics + Speed Insights
- **Persistence:** localStorage

## Getting Started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/            # Next.js app router (layout, page, global styles)
├── components/     # UI components (Tile, Keyboard, Modal, Stats, etc.)
└── utils/          # Word list and shared types
```

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
