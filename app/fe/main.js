function loadMovies() {
  fetch("http://localhost:8080/api/v1/movies")
    .then((response) => response.json())
    .then((data) => data.records)
    .then((movies) => {
      const container = document.getElementById("moviesContainer");
      container.innerHTML = "";

      for (let movie of movies) {
        const item = document.createElement("div");
        item.classList.add("movie-container");
        item.addEventListener("click", () => onMovieClick(movie));

        const title = document.createElement("p");
        title.innerText = movie.title + " (" + movie.year + ")";

        const poster = document.createElement("img");
        poster.setAttribute("src", movie.poster);
        poster.classList.add("movie-poster");

        item.appendChild(title);
        item.appendChild(poster);
        container.appendChild(item);
      }
    })
    .catch(() => alert("An error occurred while loading the movies"));
}

function onMovieClick(movie) {
  alert("Directed by " + movie.director);
}

function addMovie() {
  const formData = {
    title: document.getElementById("title").value,
    year: parseInt(document.getElementById("year").value),
    director: document.getElementById("director").value,
    genre: document.getElementById("genre").value,
    synopsis: document.getElementById("synopsis").value,
    duration: parseInt(document.getElementById("duration").value),
    poster: document.getElementById("poster").value,
  };

  fetch("http://localhost:8080/api/v1/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(() => loadMovies())
    .catch((error) => {
      console.error("Error:", error);
    });
}
