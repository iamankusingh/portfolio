import ContactForm from "../components/sections/ContactForm";
import { socials } from "../data/socials";

export default function ContactPage() {
  return (
    <>
      <section
        aria-labelledby="contact-page-title"
        className="min-h-svh bg-bg-light px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] pb-section-md text-text-dark scheme-light"
      >
        <div className="mx-auto max-w-content">
          <h1
            id="contact-page-title"
            className="mb-8 border-b border-line-light pb-6 text-center font-display text-h2 leading-none tracking-tight"
          >
            Contact
          </h1>
          <div className="mx-auto max-w-reading">
            <ContactForm labelledBy="contact-page-title" />
            <nav
              aria-label="Social profiles"
              className="mt-12 border-t border-line-light pt-6"
            >
              <h2 className="text-small tracking-[0.16em] uppercase">
                Find me elsewhere
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href ?? undefined}
                      aria-disabled={social.href ? undefined : true}
                      aria-label={
                        social.href
                          ? `${social.label} (opens in a new tab)`
                          : `${social.label} — profile URL pending`
                      }
                      target={social.href ? "_blank" : undefined}
                      rel={social.href ? "noopener noreferrer" : undefined}
                      className="flex min-h-12 items-center gap-3 text-small hover:text-water focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water aria-disabled:cursor-default"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5 shrink-0"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d={social.path} />
                      </svg>
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
