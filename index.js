const TMDB_API_KEY = '9601fb52762f0427134b21bf645a8a79';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const FALLBACK_POSTER =
  'https://via.placeholder.com/500x750?text=No+Poster';
const FAVORITES_STORAGE_KEY = 'favoriteMovieIds';
const WATCHLIST_STORAGE_KEY = 'watchlistMovieIds';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const movieGrid = document.querySelector('.movie-grid');
let favoriteIds = new Set(loadIds(FAVORITES_STORAGE_KEY));
let watchlistIds = new Set(loadIds(WATCHLIST_STORAGE_KEY));

function loadIds(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveIds(storageKey, idsSet) {
  localStorage.setItem(storageKey, JSON.stringify([...idsSet]));
}

function toggleSetValue(idsSet, value) {
  if (idsSet.has(value)) {
    idsSet.delete(value);
    return false;
  }

  idsSet.add(value);
  return true;
}

function createToggleButton(label, className, isActive, onToggle) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `movie-action-btn ${className}`;
  if (isActive) button.classList.add('active');
  button.textContent = label;
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    onToggle(button);
  });
  return button;
}

function createMovieCard(movie) {
  const card = document.createElement('article');
  card.className = 'movie-card';

  const poster = document.createElement('img');
  poster.className = 'movie-poster';
  poster.alt = movie.title || 'Movie poster';
  poster.src = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER;

  const info = document.createElement('div');
  info.className = 'movie-info';

  const title = document.createElement('div');
  title.className = 'movie-title';
  title.textContent = movie.title || 'Untitled';

  const rating = document.createElement('div');
  rating.className = 'movie-rating';
  const safeRating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A';
  rating.textContent = `⭐ ${safeRating}`;
  const movieId = movie.id;

  const actions = document.createElement('div');
  actions.className = 'movie-actions';

  const favoriteButton = createToggleButton(
    'Favorite',
    'favorite-btn',
    favoriteIds.has(movieId),
    (button) => {
      const isActive = toggleSetValue(favoriteIds, movieId);
      button.classList.toggle('active', isActive);
      saveIds(FAVORITES_STORAGE_KEY, favoriteIds);
    }
  );

  const watchlistButton = createToggleButton(
    'Watchlist',
    'watchlist-btn',
    watchlistIds.has(movieId),
    (button) => {
      const isActive = toggleSetValue(watchlistIds, movieId);
      button.classList.toggle('active', isActive);
      saveIds(WATCHLIST_STORAGE_KEY, watchlistIds);
    }
  );

  actions.appendChild(favoriteButton);
  actions.appendChild(watchlistButton);

  info.appendChild(title);
  info.appendChild(rating);
  info.appendChild(actions);
  card.appendChild(poster);
  card.appendChild(info);

  return card;
}

function renderMovies(movies) {
  movieGrid.innerHTML = '';

  if (!movies.length) {
    movieGrid.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach((movie) => {
    movieGrid.appendChild(createMovieCard(movie));
  });
}

async function fetchMovies(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch movies from TMDb.');
  }

  const data = await response.json();
  return data.results || [];
}

async function searchMovies(query) {
  if (!TMDB_API_KEY || TMDB_API_KEY === 'YOUR_TMDB_API_KEY') {
    movieGrid.innerHTML =
      '<p>Add your TMDb API key in <code>index.js</code> to load movies.</p>';
    return;
  }

  const endpoint = query
    ? `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`
    : `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;

  try {
    const movies = await fetchMovies(endpoint);
    renderMovies(movies);
  } catch (error) {
    movieGrid.innerHTML = '<p>Could not load movies. Try again.</p>';
    console.error(error);
  }
}

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim();
  if (!query) {
    searchMovies('');
  }
});

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  searchMovies(query);
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    searchMovies(query);
  }
});

searchMovies('');
