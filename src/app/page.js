import Link from "next/link";

export default function Home() {
  return (
    <main className="page home-page">
      <section className="home-hero">
        <p className="eyebrow">Filmova databaze</p>
        <h1>Knihovna filmu</h1>
        <p className="home-lead">
          Jednoducha aplikace pro spravu filmu ulozenych v Supabase. Prehled
          filmu, detail, upravy i pridavani novych zaznamu na jednom miste.
        </p>

        <div className="actions home-actions">
          <Link href="/movies">Zobrazit filmy</Link>
          <Link href="/movies/new">Pridat film</Link>
        </div>
      </section>

      <section className="home-grid" aria-label="Rychly prehled">
        <article className="home-card">
          <h2>Prehledne</h2>
          <p>Filmy jsou serazene, filtrovatelne a rychle dostupne pres detail.</p>
        </article>

        <article className="home-card">
          <h2>Jednoduche ovladani</h2>
          <p>
            Upravy a mazani jsou dostupne primo z detailu i ze seznamu filmu.
          </p>
        </article>

        <article className="home-card">
          <h2>Napojeni na Supabase</h2>
          <p>Data se ukladaji primo do databaze bez zbytecne mezivrstvy.</p>
        </article>
      </section>
    </main>
  );
}
