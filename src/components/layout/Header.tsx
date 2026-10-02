import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router";

type NavigationItem = {
  label: string;
  to: string;
};

const navigation: NavigationItem[] = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Photography", to: "/photography" },
  { label: "Lab", to: "/lab" },
  { label: "Contact", to: "/contact" },
];

// Shared only between the page controls and their copies in the modal top layer.
const topbarClass =
  "pointer-events-none fixed top-(--navigation-top) right-(--navigation-right) left-(--navigation-left) flex items-center justify-between";
const controlClass =
  "pointer-events-auto grid size-(--navigation-control-size) shrink-0 place-items-center rounded-full focus-visible:outline-3 focus-visible:outline-sun focus-visible:outline-offset-5 focus-visible:ring-5 focus-visible:ring-bg-dark";
const buttonClass = `${controlClass} cursor-pointer border border-line-light bg-bg-light text-text-dark transition-colors duration-220 hover:bg-sun motion-reduce:transition-none`;
const lineClass =
  "absolute inset-x-0 top-[7px] h-0.5 bg-current transition-transform duration-220 motion-reduce:transition-none";

export default function Header() {
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const logoRippleRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dialogRef.current?.close();
  }, [location]);

  function fireLogoRipple() {
    const el = logoRippleRef.current;
    if (!el) return;
    el.classList.remove("logo-ripple-active");
    // Force reflow so the animation restarts
    void el.offsetWidth;
    el.classList.add("logo-ripple-active");
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    fireLogoRipple();
    triggerRef.current?.focus({ preventScroll: true });
    dialog.showModal();
    dialog.scrollTop = 0;
    setIsOpen(true);
    dialog
      .querySelector<HTMLAnchorElement>("[data-menu-link]")
      ?.focus({ preventScroll: true });
  }

  function closeMenu() {
    fireLogoRipple();
    dialogRef.current?.close();
  }

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    closeMenu();
  }

  function isCurrent(item: NavigationItem) {
    if (item.to === "/") return location.pathname === "/";
    return (
      location.pathname === item.to ||
      location.pathname.startsWith(`${item.to}/`)
    );
  }

  const logo = (
    <span className="relative">
      <span
        ref={logoRippleRef}
        className="logo-ripple pointer-events-none absolute inset-0 rounded-full"
        aria-hidden="true"
      />
      <Link
        to="/"
        className={controlClass}
        aria-label="Anku Singh — Home"
        onClick={handleLinkClick}
      >
        <img
          src="/logo.svg"
          alt=""
          width="56"
          height="56"
          className="block size-full"
        />
      </Link>
    </span>
  );

  const dialogLogo = (
    <Link
      to="/"
      className={controlClass}
      aria-label="Anku Singh — Home"
      onClick={handleLinkClick}
    >
      <img
        src="/logo.svg"
        alt=""
        width="56"
        height="56"
        className="block size-full"
      />
    </Link>
  );

  return (
    <>
      <header
        className={`${topbarClass} z-(--z-header)`}
        aria-label="Site header"
      >
        {logo}
        <button
          ref={triggerRef}
          type="button"
          className={buttonClass}
          aria-label="Open navigation"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          aria-haspopup="dialog"
          onClick={openMenu}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`${lineClass} ${isOpen ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`${lineClass} ${isOpen ? "-rotate-45" : "translate-y-1"}`}
            />
          </span>
        </button>
      </header>
      <dialog
        ref={dialogRef}
        id="site-navigation"
        className="fullscreen-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-x-hidden overflow-y-auto overscroll-contain scroll-pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] scroll-pb-8 border-0 bg-bg-deep p-0 text-text-light backdrop:bg-bg-deep/60 [&:not([open])]:pointer-events-none [&:not([open])_a]:pointer-events-none [&:not([open])_button]:pointer-events-none"
        aria-labelledby="navigation-title"
        onClose={() => {
          if (!dialogRef.current?.open) setIsOpen(false);
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
      >
        <div className={`${topbarClass} z-2`}>
          {dialogLogo}
          <button
            type="button"
            className={buttonClass}
            aria-label="Close navigation"
            onClick={closeMenu}
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`${lineClass} rotate-45 motion-safe:animate-[menu-line-top_220ms_ease-out]`}
              />
              <span
                className={`${lineClass} -rotate-45 motion-safe:animate-[menu-line-bottom_220ms_ease-out]`}
              />
            </span>
          </button>
        </div>
        <div className="relative mx-auto flex min-h-full w-full max-w-content flex-col justify-center pt-[calc(var(--navigation-top)+var(--navigation-control-size)+2rem)] pr-(--navigation-right) pb-[max(2rem,env(safe-area-inset-bottom))] pl-(--navigation-left)">
          <h2
            id="navigation-title"
            className="mb-6 text-small tracking-widest text-text-muted-dark"
          >
            Explore
          </h2>
          <nav aria-label="Main navigation">
            <ol className="grid gap-0.5 motion-safe:animate-[menu-content-enter_420ms_ease-out_both] lg:grid-cols-2">
              {navigation.map((item, index) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex min-h-12 w-fit max-w-full items-baseline gap-[clamp(0.75rem,1.6vw,1.75rem)] py-[0.2rem] text-text-light"
                    data-menu-link
                    aria-current={isCurrent(item) ? "page" : undefined}
                    onClick={handleLinkClick}
                  >
                    <span
                      className="shrink-0 text-micro text-text-muted-dark tabular-nums group-aria-[current=page]:text-sun"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2.25rem,5.8vw,6rem)] leading-[1.12] tracking-[-0.035em] wrap-anywhere decoration-1 underline-offset-[0.12em] transition-colors duration-220 group-hover:text-sun group-focus-visible:text-sun group-aria-[current=page]:underline motion-reduce:transition-none">
                      {item.label}
                    </span>
                    <span
                      className="-translate-x-1 translate-y-1 shrink-0 self-center text-xl opacity-0 transition-[opacity,transform] duration-220 group-hover:translate-0 group-hover:opacity-100 group-focus-visible:translate-0 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <footer className="mt-10 border-t border-line-dark pt-6 text-small">
            <p>
              Anku Singh
              <span className="mt-1 block text-text-muted-dark">
                Technology × Nature × Human Experience.
              </span>
            </p>
          </footer>
        </div>
      </dialog>
    </>
  );
}
