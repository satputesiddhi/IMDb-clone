const apiKey = '8f0d0582';
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');

searchInput.addEventListener('keyup', function() {
    const query = searchInput.value;
    if (query) {
        fetchMovies(query);
    } else {
        movieList.innerHTML = '';
    }
});

function fetchMovies(query) {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                movieList.innerHTML = '<p>No movies found.</p>';
            }
        });
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
            
            <a href="movie.html?id=${movie.imdbID}" class="more-info">More Info</a>

        `;
        movieList.appendChild(movieCard);
    });
}

function addToFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Movie added to favorites');
    }
}
