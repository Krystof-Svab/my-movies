"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MovieDetailPage({ params }) {
  const id = params.id;
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMovie() {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setMessage(error.message);
      } else {
        setMovie(data);
      }

      setLoading(false);
    }

    if (id) {
      loadMovie();
    }
  }, [id]);

  async function deleteMovie() {
    const { error } = await supabase.from("movies").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/movies");
  }

  if (loading) {
    return <main className="page">Nacitam film...</main>;
  }

  if (message && !movie) {
    return (
      <main className="page">
        <p>{message}</p>
        <Link href="/movies">Zpet na filmy</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>{movie.title}</h1>

      <p>Reziser: {movie.director}</p>
      <p>Rok: {movie.year}</p>
      <p>Zanr: {movie.genre}</p>
      <p>Hodnoceni: {movie.rating}/10</p>
      <p>Delka: {movie.duration ? movie.duration.slice(0, 5) : "Neuvedeno"}</p>

      <div className="actions">
        <Link href={`/movies/${id}/edit`}>Upravit film</Link>

        <button type="button" onClick={deleteMovie}>
          Smazat film
        </button>
      </div>

      {message && <p>{message}</p>}

      <p className="actions">
        <Link href="/movies">Zpet na filmy</Link>
      </p>
    </main>
  );
}
