"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { movieSchema } from "@/lib/movieSchema";
import { supabase } from "@/lib/supabase";

export default function NewMoviePage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      director: "",
      year: "",
      genre: "",
      rating: "",
      duration: "",
    },
  });

  async function onSubmit(values) {
    setMessage("");

    const { data, error } = await supabase
      .from("movies")
      .insert(values)
      .select("id")
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push(`/movies/${data.id}`);
  }

  return (
    <main className="page">
      <h1>Pridat film</h1>

      <form className="movie-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="title">Nazev</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="director">Reziser</label>
          <input id="director" type="text" {...register("director")} />
          {errors.director && (
            <p className="form-error">{errors.director.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="year">Rok</label>
          <input id="year" type="number" {...register("year")} />
          {errors.year && <p className="form-error">{errors.year.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="genre">Zanr</label>
          <input id="genre" type="text" {...register("genre")} />
          {errors.genre && <p className="form-error">{errors.genre.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="rating">Hodnoceni</label>
          <input
            id="rating"
            type="number"
            step="0.1"
            {...register("rating")}
          />
          {errors.rating && (
            <p className="form-error">{errors.rating.message}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="duration">Delka</label>
          <input id="duration" type="time" {...register("duration")} />
          {errors.duration && (
            <p className="form-error">{errors.duration.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ukladam..." : "Ulozit film"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <p className="actions">
        <Link href="/movies">Zpet na filmy</Link>
      </p>
    </main>
  );
}
