import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Hero from "./Sections/Hero";
import About from "./Sections/About";
import Button from "./Sections/Button";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <main>
      <Hero />
      <About />
      <Button />
    </main>
  );
}

export default App;
