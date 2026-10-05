import { useEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Header from "./Header";

export default function AppLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousLocation = useRef(location);

  useEffect(() => {
    if (previousLocation.current !== location) {
      const target = location.hash
        ? document.getElementById(location.hash.slice(1))
        : mainRef.current;
      target?.focus({ preventScroll: true });
      previousLocation.current = location;
    }
  }, [location]);

  return (
    <>
      <Header />
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className={location.pathname === "/"
          ? "min-h-svh"
          : "pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1.5rem)] mx-auto min-h-svh max-w-content px-page pb-section-sm"}
      >
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
