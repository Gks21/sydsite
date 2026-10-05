import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>This page wandered off.</h1>
        <p>Try home, services, or booking — Square still has the calendar.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/">
            Home
          </Link>
          <Link className="btn btn-secondary" href="/book">
            Book
          </Link>
        </div>
      </div>
    </section>
  );
}
