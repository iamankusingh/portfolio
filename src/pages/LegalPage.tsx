import { Link } from "react-router";

const modelCredits = [
  {
    title: "Low-Poly Floating Island",
    author: "Ram Surya",
    authorUrl: "https://sketchfab.com/ramsurya",
    source:
      "https://sketchfab.com/3d-models/low-poly-floating-island-9700497248364520bd2a9e61272d6b62",
    license: "Sketchfab Standard License",
    licenseUrl: "https://sketchfab.com/licenses",
    changes:
      "Scale and placement changed; embedded water omitted and custom water, lighting, and an introduction sequence added.",
  },
  {
    title: "Low Poly Mountain Free",
    author: "Poly Craftsman",
    authorUrl: "https://sketchfab.com/lowpolyartwork",
    source:
      "https://sketchfab.com/3d-models/low-poly-mountain-free-dabda46f9be2416c93a4b584be17786b",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes:
      "Scale, rotation, and placement changed; repeated to form the distant mountain range.",
  },
  {
    title: "Fishing Boat",
    author: "JasperTobias",
    authorUrl: "https://sketchfab.com/JasperTobias",
    source:
      "https://sketchfab.com/3d-models/fishing-boat-e07c8b9cc38543879a4e2fe145e62df6",
    license: "CC BY-NC 4.0 (noncommercial use only)",
    licenseUrl: "https://creativecommons.org/licenses/by-nc/4.0/",
    changes:
      "Scale, rotation, and shore placement changed; original textures retained.",
  },
  {
    title: "Cloud Test",
    author: "Andrey Martyanov",
    authorUrl: "https://sketchfab.com/3dartel",
    source:
      "https://sketchfab.com/3d-models/cloud-test-6d1fff581b3a424d88ee2125f909f3f3",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    changes:
      "Opacity, lighting response, scale, and placement changed; repeated and animated with a looping drift.",
  },
];

const linkClass =
  "underline decoration-1 underline-offset-4 hover:text-water focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-water";
const sectionClass = "border-b border-line-light py-10 sm:py-14";
const headingClass = "mb-6 font-display text-h3 leading-tight";

export default function LegalPage() {
  return (
    <>
      <section
        aria-labelledby="legal-page-title"
        className="min-h-svh bg-bg-light px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] pb-section-md text-text-dark scheme-light"
      >
        <div className="mx-auto max-w-content">
          <h1
            id="legal-page-title"
            className="mb-8 border-b border-line-light pb-6 text-center font-display text-h2 leading-none tracking-tight"
          >
            Legal & credits
          </h1>
          <div className="mx-auto max-w-reading text-body leading-relaxed">
            <section
              aria-labelledby="model-credits-title"
              className={sectionClass}
            >
              <h2 id="model-credits-title" className={headingClass}>
                3D model credits
              </h2>
              <p>
                The homepage landscape is built on the work of these artists.
                Each model remains subject to its own license; the photography
                permission below does not apply to these assets.
              </p>
              <ul className="mt-8 space-y-8">
                {modelCredits.map((model) => (
                  <li key={model.source}>
                    <h3 className="mb-2 text-body-lg font-medium">
                      <a href={model.source} className={linkClass}>
                        {model.title}
                      </a>
                    </h3>
                    <p>
                      By{" "}
                      <a href={model.authorUrl} className={linkClass}>
                        {model.author}
                      </a>
                      {" · "}
                      <a href={model.licenseUrl} className={linkClass}>
                        {model.license}
                      </a>
                    </p>
                    <p className="mt-2 text-small text-text-muted-light">
                      Adaptations: {model.changes}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="photography-rights-title"
              className={sectionClass}
            >
              <h2 id="photography-rights-title" className={headingClass}>
                Photography & copyright
              </h2>
              <div className="space-y-4">
                <p>
                  Copyright © Anku Singh. Anyone may download, share, publish,
                  and adapt photographs authored by Anku Singh on this website,
                  for personal or commercial use, provided the author is
                  credited. No separate permission or fee is required for these
                  uses.
                </p>
                <p>
                  Include a visible credit alongside the photograph or in an
                  accompanying credits section: “Photo by Anku Singh”. For
                  online use, link the credit to this website. If you edit a
                  photograph, identify it as edited. Do not claim authorship or
                  imply that Anku endorses your use.
                </p>
                <p>
                  This permission covers Anku’s photographic copyright only. It
                  does not grant rights to third-party artwork, brands, or the
                  likeness or privacy of people pictured. Separately credited
                  images follow their stated terms. The logo, 3D models, and
                  other website materials are not covered by this permission.
                </p>
              </div>
            </section>

            <section aria-labelledby="terms-title" className={sectionClass}>
              <h2 id="terms-title" className={headingClass}>
                Terms & conditions
              </h2>
              <div className="space-y-4">
                <p>
                  This is Anku Singh’s personal portfolio and creative
                  playground. Use it lawfully and respectfully. Do not interfere
                  with its operation, attempt unauthorized access, or use the
                  contact form for spam or harmful content.
                </p>
                <p>
                  Unless permission is stated above or in a separate license,
                  rights in the site’s writing, design, branding, and other
                  original material remain with their respective owners. Demo
                  projects and illustrative content labeled as such are not
                  verified client work or claims of real-world outcomes.
                </p>
                <p>
                  The site and its experiments are provided as available,
                  without a promise of uninterrupted access, accuracy, or
                  suitability for a particular purpose. To the extent permitted
                  by applicable law, Anku is not responsible for losses arising
                  from use of the site. Nothing here excludes rights or
                  responsibilities that cannot legally be excluded.
                </p>
                <p>
                  External links are provided for reference; their content and
                  policies are controlled by their operators. Sending an inquiry
                  does not create a client relationship or agreement to
                  undertake work. Any engagement requires a separate agreement.
                </p>
              </div>
            </section>

            <section aria-labelledby="privacy-title" className={sectionClass}>
              <h2 id="privacy-title" className={headingClass}>
                Privacy policy
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-medium">Messages you send</h3>
                  <p>
                    The contact form sends your name, email address, optional
                    company, and message to Google Apps Script for storage in a
                    spreadsheet and handling your inquiry. Submit only
                    information needed for the conversation, and avoid sensitive
                    personal information. Google processes information under its{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className={linkClass}
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">
                    Browser storage & cookies
                  </h3>
                  <p>
                    The current site code does not add advertising trackers,
                    analytics, or cookies. Flowpaper stores a local preference
                    for 30 days if you choose “Don’t show again” for its
                    instructions. Navigation uses session storage to restore
                    scroll positions. You can clear these preferences through
                    your browser’s site-data settings. Flowpaper drawings and
                    exported images are generated in your browser, without an
                    upload by this application.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">
                    Service providers & retention
                  </h3>
                  <p>
                    Hosting and delivery providers may process technical request
                    information, such as IP addresses and browser details, to
                    deliver and secure their services. A fixed retention period
                    for contact records and provider logs has not yet been
                    published. No specific deletion schedule is promised here.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Your choices</h3>
                  <p>
                    You can browse without submitting the contact form. To ask
                    about your information, request access, correction, or
                    deletion, or raise a copyright concern, use the{" "}
                    <Link to="/contact" className={linkClass}>
                      contact page
                    </Link>
                    . Requests are subject to applicable law and any records
                    that must be retained. No internet service can guarantee
                    absolute security.
                  </p>
                </div>
              </div>
            </section>
            <p className="mt-8 text-small text-text-muted-light">
              Last updated <time dateTime="2026-10-26">26 October 2026</time>.{" "}
              Future changes will be reflected on this page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
