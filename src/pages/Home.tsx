import About from "../components/sections/About";
import Capabilities from "../components/sections/Capabilities";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import Photography from "../components/sections/Photography";
import SelectedWork from "../components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <title>Anku Singh — Creative Technologist</title>
      <Hero />
      <SelectedWork />
      <About />
      <Capabilities />
      <Photography />
      <Contact />
    </>
  );
}
