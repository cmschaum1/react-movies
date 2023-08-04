import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";

import "./App.css";

//const url = "https://swapi.dev/api/";
const url = "https://react-movies-b6007-default-rtdb.firebaseio.com/";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovies() {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = getUrl("movies.json");
      //console.log(endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      console.log(data);

      const transformedMovies = [];
      for (const key in data) {
        transformedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        }) //transformMovie(data[key]))
      }

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  const fetchHandler = useCallback(async () => {
    await fetchMovies();
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  function addMovieHandler(movie) {
    //const endpoint = 
    const response = fetch(
      getUrl("movies.json"), {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      })
    console.log(response)
  }

  let content = <p>No Movies found.</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
