import { pageMetadata, siteOrigin } from "../../data/seo";

type PageMetadataProps = {
  pathname: string;
};

const socialImage = `${siteOrigin}/og-image.svg`;

export default function PageMetadata({ pathname }: PageMetadataProps) {
  const page = pageMetadata[pathname];

  if (!page) {
    return (
      <>
        <title>Page not found — Anku Singh</title>
        <meta name="robots" content="noindex, follow" />
      </>
    );
  }

  const canonical = `${siteOrigin}${pathname === "/" ? "/" : pathname}`;

  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Anku Singh" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={socialImage} />
    </>
  );
}
