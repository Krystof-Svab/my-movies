"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMovies() {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("title", { ascending: true });

      if (error) {
        setMessage(error.message);
      } else {
        setMovies(data ?? []);
      }

      setLoading(false);
    }

    loadMovies();
  }, []);

  const genres = useMemo(() => {
    return [...new Set(movies.map((movie) => movie.genre).filter(Boolean))].sort();
  }, [movies]);

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre === selectedGenre)
    : movies;

  async function deleteMovie(id) {
    const { error } = await supabase.from("movies").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
  }

  return (
    <main className="page movies-page">
      <div className="movies-header">
        <h1>Filmy</h1>

        <div className="actions">
          <Link href="/movies/new">Pridat film</Link>
          <Link href="/">Domu</Link>
        </div>

        <div className="filter">
          <label htmlFor="genre">Filtrovat podle zanru</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option value="">Vsechny zanry</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Nacitam filmy...</p>}
      {message && <p className="form-error">{message}</p>}

      {!loading && !message && filteredMovies.length === 0 && (
        <p>Zadne filmy k zobrazeni.</p>
      )}

      {!loading && !message && filteredMovies.length > 0 && (
        <ul className="movie-list">
          {filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-item">
              <h2>
                <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
              </h2>
              <p>Reziser: {movie.director}</p>
              <p>Rok: {movie.year}</p>
              <p>Zanr: {movie.genre}</p>
              <p>Hodnoceni: {movie.rating}/10</p>
              <p>Delka: {movie.duration ? movie.duration.slice(0, 5) : "Neuvedeno"}</p>

              <div className="movie-actions">
                <Link href={`/movies/${movie.id}`}>Detail</Link>
                <Link href={`/movies/${movie.id}/edit`}>Upravit</Link>
                <button type="button" onClick={() => deleteMovie(movie.id)}>
                  Smazat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
