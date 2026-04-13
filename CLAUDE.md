# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Maryem Beauty Shop is a French-language beauty/cosmetics e-commerce SPA built with React 18 + React Router v6, deployed on Vercel. The site is entirely in French and targets Tunisian customers (prices in DT - Tunisian Dinar).

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

## Architecture

- **Vite** as build tool with `@vitejs/plugin-react`
- **React Router v6** handles all client-side routing (`BrowserRouter` in `src/App.jsx`)
- **Cart state** managed via React Context (`src/context/CartContext.jsx`) with `localStorage` persistence
- **Product data** in `src/data/products.js` — sourced from analyzing product photos in `public/images/`
- **SEO** via `react-helmet-async` — each page sets its own `<title>` and `<meta>` tags inside the `HelmetProvider` in `src/main.jsx`
- **Vercel SPA rewrites** configured in `vercel.json`

## Key Files

- `src/main.jsx` — Entry point, wraps app in `HelmetProvider` and `CartProvider`
- `src/App.jsx` — Router setup, all routes defined here
- `src/data/products.js` — Product catalog with `categories` array and helper functions
- `src/context/CartContext.jsx` — Cart reducer with ADD/REMOVE/UPDATE_QUANTITY/CLEAR actions
- `public/sitemap.xml` and `public/robots.txt` — SEO files
- `index.html` — Root HTML with OG/Twitter meta tags and Google Fonts

## Design System

- **No Tailwind** — plain CSS files alongside components
- **Color palette**: pink (#e8a0bf), rose-dark (#c2789e), cream (#fdf6f0), pink-light (#f5d5e0)
- **Typography**: Playfair Display (headings), Nunito (body) via Google Fonts
- **CSS variables** defined in `src/index.css`

## Categories

Four product categories with slug IDs: `maquillage`, `soin-peau`, `soin-capillaire`, `parfums`

## WhatsApp Ordering

Orders are submitted via WhatsApp deep link to +21640599355 with a pre-filled message template. The `OrderForm` component builds and encodes this message.
