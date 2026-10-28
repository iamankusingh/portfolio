import { useEffect } from "react";
import { useRouteError } from "react-router";

export default function RouteError() {
  const error = useRouteError();

  useEffect(() => {
    console.error("Portfolio route failed:", error);
  }, [error]);

  return (
    <section
      role="alert"
      className="min-h-screen py-section-md flex flex-col items-center justify-center px-page text-center"
    >
      <h1 className="font-display text-h1">Something didn’t load.</h1>
      <p className="mt-6">Please try again, or return to the homepage.</p>
      <div className="mt-8 flex flex-wrap gap-6">
        <button
          className="min-h-11 cursor-pointer underline underline-offset-8"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
        {/* A full navigation also recovers from a failed application shell. */}
        <a
          className="inline-flex min-h-11 items-center underline underline-offset-8"
          href="/"
        >
          Back to home
        </a>
      </div>
    </section>
  );
}
