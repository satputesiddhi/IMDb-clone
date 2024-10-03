const favoritesList = document.getElementById('favorites-list');
const apiKey = '8f0d0582';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

favorites.forEach(imdbID => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
            `;
            favoritesList.appendChild(movieCard);
        });
});

function removeFromFavorites(imdbID) {
    favorites = favorites.filter(id => id !== imdbID);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.location.reload();  // Reload to update the list
}
