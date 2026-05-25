import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <h1>Knihovna filmu</h1>
      <p>Jednoducha aplikace pro spravu filmu ulozenych v Supabase.</p>

      <div className="actions">
        <Link href="/movies">Zobrazit filmy</Link>
        <Link href="/movies/new">Pridat film</Link>
      </div>
    </main>
  );
}
