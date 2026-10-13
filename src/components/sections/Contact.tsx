const fieldClass =
  "mt-2 block min-h-12 w-full rounded-none border-b border-line-light bg-transparent px-0 py-3 text-body text-text-dark placeholder:text-text-muted-light transition-[border-color] duration-300 ease-out focus:border-text-dark focus:outline-none focus-visible:outline-none motion-reduce:transition-none";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
      className="relative flex min-h-svh items-center bg-bg-light px-page pt-28 pb-16 text-text-dark scheme-light md:py-28"
    >
      <div className="mx-auto grid w-full max-w-content gap-12 border-t border-line-light pt-6 lg:grid-cols-2 lg:items-center lg:gap-24 lg:pt-12">
        <div>
          <p className="text-small tracking-[0.16em] uppercase">Contact</p>
          <h2
            id="contact-title"
            className="mt-6 font-display text-display-lg leading-[0.95] tracking-[-0.035em]"
          >
            Let’s make
            <br />
            <span className="italic">something</span>
            <br />
            matter.
          </h2>
          <p className="mt-8 max-w-sm text-body-lg text-text-muted-light">
            Have an idea in mind? Tell me a little about it.
          </p>
        </div>

        <form aria-labelledby="contact-title" className="min-w-0 space-y-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="text-small font-medium">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-small font-medium">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="Your email address"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-company" className="text-small font-medium">
              Company{" "}
              <span className="font-normal text-text-muted-light">
                (optional)
              </span>
            </label>
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              maxLength={160}
              placeholder="Your company or studio"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="text-small font-medium">
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              maxLength={5000}
              placeholder="What would you like to create?"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="group inline-flex min-h-12 cursor-pointer items-center justify-between gap-6 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-small font-medium focus-visible:outline-text-dark focus-visible:outline-offset-4"
            >
              Send message
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-text-dark text-primary transition-colors duration-220 group-hover:bg-secondary group-hover:text-text-dark group-focus-visible:bg-secondary group-focus-visible:text-text-dark motion-reduce:transition-none">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-5 -rotate-45"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
