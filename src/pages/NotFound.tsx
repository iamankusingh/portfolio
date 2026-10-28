import LinkButton from "../components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="min-h-screen py-section-md flex flex-col items-center justify-center px-page text-center">
      <p className="mb-6 text-9xl font-extrabold">404</p>
      <h1 className="font-display text-h1">Page Not Found.</h1>
      <p className="my-6 max-w-reading">
        The address may be incorrect, or this page may not be available yet.
      </p>
      <LinkButton to="/">Back To Home</LinkButton>
    </section>
  );
}
