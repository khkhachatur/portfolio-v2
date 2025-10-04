import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Hero from "./Sections/Hero";
import About from "./Sections/About";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}

export default App;
