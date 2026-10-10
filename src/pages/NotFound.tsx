import LinkButton from "../components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="py-section-md">
      <title>Page not found — Anku Singh</title>
      <p className="mb-6 text-6xl text-text-muted-dark">404</p>
      <h1 className="font-display text-h1">Not Found.</h1>
      <p className="my-6 max-w-reading">
        The address may be incorrect, or this page may not be available yet.
      </p>
      <LinkButton to="/">Back To Home</LinkButton>
    </section>
  );
}
