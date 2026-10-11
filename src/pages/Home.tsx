import About from "../components/sections/About";
import Capabilities from "../components/sections/Capabilities";
import Hero from "../components/sections/Hero";
import SelectedWork from "../components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <title>Anku Singh — Creative Technologist</title>
      <Hero />
      <SelectedWork />
      <About />
      <Capabilities />
    </>
  );
}
