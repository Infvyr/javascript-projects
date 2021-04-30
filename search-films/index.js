const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "661fdecc",
            s: searchTerm,
        },
    });

    if (response.data.Error) return [];

    return response.data.Search;
};

const root = document.querySelector(".autocomplete-films");
root.innerHTML = `
    <label><b>Search for a film:</b></label>
    <input class="input" type="search" id="search-film-input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.getElementById("search-film-input");
const dropwdown = document.querySelector(".autocomplete-films .dropdown");
const resultWrapper = document.querySelector(".autocomplete-films .results");
const isActiveClass = "is-active";

const onInput = async (e) => {
    const movies = await fetchData(e.target.value);

    // close dropdown when input is blank
    if (!movies.length) {
        dropwdown.classList.remove("is-active");
        return;
    }

    resultWrapper.innerHTML = "";
    dropwdown.classList.add(isActiveClass);

    for (let movie of movies) {
        const option = document.createElement("a");
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        option.classList.add("dropdown-item");

        option.innerHTML = `
        <figure class="poster">
            <img src="${imgSrc}" />
        </figure>
        <h5 class="poster-title">${movie.Title}</h5>
        `;

        // detect the click on individual option
        // and fill the search input out with movie title
        option.addEventListener("click", () => {
            dropwdown.classList.remove(isActiveClass);
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        resultWrapper.appendChild(option);
    }
};

input.addEventListener("input", debounce(onInput, 600));

// close dropdown by clicking outside that
document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
        dropwdown.classList.remove(isActiveClass);
    }
});

const onMovieSelect = async (movie) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "661fdecc",
            i: movie.imdbID,
        },
    });
};
