import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="py-section-md">
      <title>Page not found — Anku Singh</title>
      <p className="mb-6 text-6xl text-text-muted-dark">404</p>
      <h1 className="font-display text-h1">Not Found.</h1>
      <p className="mt-6 max-w-reading">
        The address may be incorrect, or this page may not be available yet.
      </p>
      <Link
        className="mt-8 inline-flex min-h-11 items-center underline underline-offset-8"
        to="/"
      >
        Back to home
      </Link>
    </section>
  );
}
