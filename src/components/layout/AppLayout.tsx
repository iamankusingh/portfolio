import { useEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import CustomCursor from "../ui/CustomCursor";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousLocation = useRef(location);

  useSmoothScroll(location.key);

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
      <CustomCursor />
      <Header />
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className={location.pathname === "/lab" ? "min-h-dvh" : "min-h-screen"}
      >
        <Outlet />
      </main>
      {location.pathname === "/" && <Footer />}
      <ScrollRestoration />
    </>
  );
}
