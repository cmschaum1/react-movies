import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const url = "https://swapi.dev/api/";

const getUrl = (endpoint) => {
  return url + endpoint;
};

const transformMovie = (movie) => {
  return {
    id: movie.episode_id,
    title: movie.title,
    openingText: movie.opening_crawl,
    releaseDate: movie.release_date,
  };
};

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    const response = await fetch(getUrl("films"));
    const data = await response.json();

    const transformedMovies = data.results.map((movie) => {
      return transformMovie(movie);
    });
    setMovies(transformedMovies);
  }

  async function fetchHandler() {
    await fetchMovies();
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
