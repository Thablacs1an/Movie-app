# Movie App

A simple, responsive movie browser built with plain HTML/CSS/vanilla JavaScript. It fetches movies from The Movie Database (TMDb), lets you search by title, and provides `Favorite` / `Watchlist` toggles (persisted in `localStorage`).

## Features (current)

- Browse popular movies
- Search for movies by title
- Movie cards with poster and rating
- Favorite and Watchlist toggles (persist locally)

## Setup

1. Get a TMDb API key.
2. Open `index.js` and replace the `TMDB_API_KEY` constant near the top of the file.

Note: this is a purely front-end app, so the API key is public (visible in the browser).

## Run

Open `index.html` in your browser, or use VS Code Live Server.

## Usage

- On page load, the app fetches and renders popular movies.
- Type a title in the search box and press `Enter` or click `Search`.
- Use the `Favorite` / `Watchlist` buttons on each movie card to toggle them.

## Project files

- `index.html` - page layout (header + search + movie grid)
- `style.css` - dark, cinematic styling
- `index.js` - TMDb API calls, DOM rendering, and `localStorage` logic

## Storage keys

- Favorites: `favoriteMovieIds`
- Watchlist: `watchlistMovieIds`

## Future improvements

- Movie details modal/page
- Better loading/error UI (including retry)
- Pagination or infinite scroll
- Hide API calls behind a backend/proxy to keep keys private

