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

// Supply verified profile URLs here before enabling these links.
const socials: { label: string; href: string | null; path: string }[] = [
  {
    label: "GitHub",
    href: "https://github.com/iamankusingh/",
    path: "M12 .5a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.5 11.5 0 0 1 12 6.3c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.769.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12 12 0 0 0 12 .5Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/iamankusingh/",
    path: "M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm6-2.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anku-singh-07458b289/",
    path: "M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.75 1.36-1.55 2.79-1.55 2.99 0 3.58 1.97 3.58 4.53v5.27Z",
  },
  {
    label: "X",
    href: "https://x.com/iamankusingh/",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z",
  },
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dialogRef.current?.close();
  }, [location]);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current?.focus({ preventScroll: true });
    dialog.showModal();
    dialog.scrollTop = 0;
    setIsOpen(true);
    dialog
      .querySelector<HTMLAnchorElement>("[data-menu-link]")
      ?.focus({ preventScroll: true });
  }

  function closeMenu() {
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
        className="fullscreen-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-x-hidden overflow-y-auto overscroll-contain scroll-pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] scroll-pb-8 border-0 bg-bg-deep p-0 text-text-light [&:not([open])]:pointer-events-none [&:not([open])_a]:pointer-events-none [&:not([open])_button]:pointer-events-none"
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
          {logo}
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
        <div className="relative flex min-h-full w-full flex-col justify-center pt-[calc(var(--navigation-top)+var(--navigation-control-size)+2rem)] pr-(--navigation-right) pb-[max(2rem,env(safe-area-inset-bottom))] pl-(--navigation-left)">
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
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line-dark pt-6 text-small">
            <p>
              Anku Singh
              <span className="mt-1 block text-text-muted-dark">
                Technology × Nature × Human Experience.
              </span>
            </p>
            <div aria-label="Social profiles">
              <ul className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <li
                    key={social.label}
                    className={
                      isOpen
                        ? "motion-safe:animate-[menu-content-enter_420ms_ease-out_both]"
                        : undefined
                    }
                    style={{ animationDelay: `${180 + index * 70}ms` }}
                  >
                    <a
                      href={social.href ?? undefined}
                      aria-disabled={social.href ? undefined : true}
                      aria-label={
                        social.href
                          ? social.label
                          : `${social.label} — profile URL pending`
                      }
                      title={
                        social.href
                          ? social.label
                          : `${social.label} — profile URL pending`
                      }
                      target={social.href ? "_blank" : undefined}
                      rel={social.href ? "noopener noreferrer" : undefined}
                      className="grid size-12 place-items-center rounded-full border border-line-dark text-text-muted-dark transition-colors duration-220 hover:border-sun hover:text-sun focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun aria-disabled:cursor-default motion-reduce:transition-none"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
