import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Hero from "./Sections/Hero";
import Work from "./Sections/Work";
import About from "./Sections/About";
import Button from "./Sections/Button";
import Footer from "./Sections/Footer";
import Projects from "./Sections/Projects";
import Contacts from "./Sections/Contacts";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Button /> */}
      <Work />
      <Projects />
      <Contacts />
      <Footer />
    </main>
  );
}

export default App;
