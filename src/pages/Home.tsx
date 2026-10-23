import About from "../components/sections/About";
import Capabilities from "../components/sections/Capabilities";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Lab from "../components/sections/Lab";
import Photography from "../components/sections/Photography";
import SelectedWork from "../components/sections/SelectedWork";
import PageLoader from "../components/ui/PageLoader";
import useHomepageLoading from "../hooks/useHomepageLoading";

export default function Home() {
  const loading = useHomepageLoading();
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
