import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "../components/sections/About";
import Capabilities from "../components/sections/Capabilities";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Lab from "../components/sections/Lab";
import Photography from "../components/sections/Photography";
import SelectedWork from "../components/sections/SelectedWork";
import PageLoader from "../components/ui/PageLoader";
import useHomepageLoading from "../hooks/useHomepageLoading";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const loading = useHomepageLoading();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (forced-colors: none)", () => {
      document.querySelectorAll<HTMLElement>("[data-daylight]").forEach((section) => {
        const light = section.querySelector("[data-daylight-glow]");
        if (!light) return;
        gsap.fromTo(light, { opacity: 0.25 }, {
          opacity: 1,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      });
    });
    return () => media.revert();
  }, []);
  return (
    <>
      <title>Anku Singh — Creative Technologist</title>
      {loading.visible && (
        <PageLoader
          progress={loading.progress}
          onComplete={loading.complete}
          onSkip={loading.skip}
        />
      )}
      <Hero
        preparing={loading.visible}
        forceStatic={loading.forceStatic}
        onReady={loading.onHeroReady}
      />
      <SelectedWork />
      <About />
      <Lab />
      <Capabilities />
      <Photography />
      <Contact />
    </>
  );
}
