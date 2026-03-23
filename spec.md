# 🎬 Movie App – Specification (spec.md)

## Overview

A modern, responsive movie browsing web app built using HTML, CSS, and JavaScript (no frameworks). Users can discover movies, view details, search titles, and interact with a clean, cinematic UI.

---

## Features

### Core Features

* Browse popular movies
* Search for movies by title
* View movie details (poster, title, rating, overview)
* Display movie ratings and release dates
* Responsive design (mobile-first)

### UI/UX Features

* Dark theme with cinematic gradients
* Smooth hover effects on movie cards
* Scrollable movie sections (e.g., Trending, Top Rated)
* Modal or page for movie details
* Loading state UX (spinner/skeleton while fetching)
* Error state UX (friendly message + retry action)
* Empty state UX (clear “no results” messaging)

### Advanced (Future Enhancements)

* User authentication (login/signup)
* Watchlist / Favorites system
* Movie trailers (video playback)
* Pagination or infinite scroll
* Genre filtering

---

##  UI Components

### 1. Header

* App title/logo
* Search bar

### 2. Movie Grid Section

* Grid layout of movie cards
* Each card includes:

  * Poster image
  * Movie title
  * Rating badge

### 3. Movie Detail View (Modal or Page)

* Large poster
* Title
* Release date
* Rating
* Overview/description

### 4. Categories Section (Optional)

* Trending
* Top Rated
* Upcoming

### 5. Loader / Empty State
* Loading spinner or skeleton while fetching from TMDb
* Prevent duplicate requests while loading (or ignore out-of-order responses)
* “No results found” message when search returns zero results
* Error state UI (e.g., “Could not load movies. Check your connection.”) plus a `Retry` button

---
## ⌨️ Keyboard Shortcuts
* `Enter` in the search input runs the search
* `Esc` clears the search input and reloads popular movies (or restores the last default view)
* `/` focuses the search input (unless focus is already inside an input/textarea)
* `Ctrl + K` / `Cmd + K` focuses the search input

Keyboard shortcuts should not interfere with normal typing (ignore shortcuts while the user is actively typing in an input).

---

## 🌐 External APIs

### 🎥 The Movie Database (TMDB) API

* Provides movie data (titles, posters, ratings, etc.)
* Requires API key
* Endpoints:

  * Popular movies
  * Search movies
  * Movie details

---

## ⚙️ JavaScript Architecture

### State Variables

* movies (array)
* currentMovie (object)
* searchQuery (string)
* isLoading (boolean)
* errorMessage (string | null)
* activeRequestId (number) to avoid race conditions / out-of-order updates

---

## 🔧 Key Functions

### 1. fetchMovies()

* Fetches popular movies from API
* Sets `isLoading=true` before the request and resets after completion
* Handles non-2xx responses (HTTP errors) and network failures
* On success: stores results in state and clears `errorMessage`
* On failure: sets `errorMessage` and shows the error UI (with retry)

### 2. searchMovies(query)

* Fetches movies based on search input
* Sets `isLoading=true` and clears any previous `errorMessage`
* Uses `activeRequestId` (or equivalent) so only the latest response updates the UI

### 3. displayMovies(movies)

* Renders movie cards to DOM (title, poster, rating)
* Updates the UI even when movies are empty (shows empty state)

### 4. createMovieCard(movie)

* Creates individual movie card element (poster, title, rating, and action buttons)

### 5. showMovieDetails(movie)

* Displays detailed info in modal or page

### 6. handleSearch(event)

* Captures user input from the search bar
* Triggers `searchMovies(query)` on `Enter` and/or search button click

### 7. toggleLoader(show)

* Shows or hides loading spinner/skeleton
* Optionally disables search controls while loading

### 8. setError(message) / clearError()

* `setError(message)` sets `errorMessage`, hides loader, and shows the error UI
* `clearError()` clears the error state when a new request begins

### 9. handleKeyboardShortcuts(event)

* Implements `/`, `Ctrl+K`/`Cmd+K`, and `Esc` behaviors

---

## 🗂️ File Structure

* index.html → App structure
* styles.css → Styling (dark theme, layout)
* script.js → App logic & API calls

---

## 🔐 Notes

* Store API keys securely (use environment variables for production)
* Optimize images (lazy loading recommended)

---

## 📈 Future Improvements

* Add local storage for watchlist
* Integrate video trailers (YouTube API)
* Add animations and transitions
* Convert to PWA for offline support

---

## ✅ Summary

This movie app provides a clean and engaging interface for browsing films, with scalable architecture for adding advanced features like authentication, watchlists, and streaming integrations.
