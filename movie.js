const apiKey = '8f0d0582';
const movieDetails = document.getElementById('movie-details');
const params = new URLSearchParams(window.location.search);
const movieID = params.get('id');

fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(movie => {
        movieDetails.innerHTML = `
            <h1>${movie.Title}</h1>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
        `;
    });
