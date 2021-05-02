const onMovieSelect = async (movie) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "661fdecc",
            i: movie.imdbID,
        },
    });
    document.getElementById("summary").innerHTML = movieTemplate(response.data);
};

createAutoComplete({
    fetchData: async (searchTerm) => {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: "661fdecc",
                s: searchTerm,
            },
        });

        if (response.data.Error) return [];

        return response.data.Search;
    },
    root: document.querySelector(".autocomplete"),
    renderOption: (movie) => {
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

        return `
        <figure class="poster">
            <img src="${imgSrc}" />
        </figure>
        <h5 class="poster-title">${movie.Title} (${movie.Year})</h5>
        `;
    },
    onOptionSelect: (movie) => onMovieSelect(movie),
    inputValue: (movie) => movie.Title,
});

const movieTemplate = (movieDetail) => {
    return `
        <article class="media" style="margin-bottom: 1.5rem;">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" alt="${movieDetail.Title}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h2>${movieDetail.Title}</h2>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <div class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </div>
        <div class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </div>
        <div class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </div>
        <div class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB rating</p>
        </div>
        <div class="notification is-primary">
            <p class="title">${movieDetail.Votes}</p>
            <p class="subtitle">IMDB Votes</p>
        </div>
    `;
};
