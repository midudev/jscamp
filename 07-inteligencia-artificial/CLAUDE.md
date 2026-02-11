# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Module 07 (Inteligencia Artificial) of the JSCamp bootcamp. It's an Express 5 API server with CORS and in-memory rate limiting. The project is written in Spanish (logs, error messages, etc.).

## Commands

- **Install dependencies:** `pnpm install`
- **Start server:** `pnpm start` (runs `node app.js`)
- **Dev mode with watch:** `pnpm dev` (runs `node --watch app.js`)

The server starts on `http://localhost:3000` (configurable via `PORT` env var).

## Architecture

- **ES Modules** — `"type": "module"` in package.json, use `import`/`export` syntax
- **Express 5** — note: Express 5 (not 4), which has differences in routing and error handling
- `app.js` — main entry point: creates Express app, applies middleware (cors, json parsing, rate limiting), defines routes, starts server
- `rate-limit.js` — custom in-memory rate limiter middleware (Map-based, 30 req/min per IP, auto-cleanup via setInterval)
- `demo-claude-code/` — demo/example directory (currently empty)

## Conventions

- No build step — plain Node.js, no TypeScript, no bundler
- Package manager is **pnpm**
- Error messages and console output are in **Spanish**
