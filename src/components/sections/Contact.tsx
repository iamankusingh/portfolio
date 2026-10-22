import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
      className="relative flex min-h-svh items-center bg-bg-light px-page pt-28 pb-16 text-text-dark scheme-light md:py-28"
    >
      <div className="w-full grid gap-12 border-t border-line-light pt-6 lg:grid-cols-2 lg:items-center lg:gap-24 lg:pt-12">
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

        <ContactForm labelledBy="contact-title" />
      </div>
    </section>
  );
}
