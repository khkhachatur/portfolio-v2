import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Hero from "./Sections/Hero";
import Work from "./Sections/Work";
import About from "./Sections/About";
import Button from "./Sections/Button";
import Footer from "./Sections/Footer";
import Finish from "./Sections/Finish.jsx";
import Projects from "./Sections/Projects";
import Contacts from "./Sections/Contacts";
import Education from "./Sections/Education";
import Responsive from "./Sections/Responsive.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <main>
      <Hero />
      <About />
      <Button />
      <section id="work-section">
        <Work />
      </section>
      <section id="projects-section">
        <Projects />
      </section>
      <section id="education-section">
        <Education />
      </section>
      <section id="finish-section">
        <Finish />
      </section>
      {/* <section id="responsive-section">
        <Responsive />
      </section> */}
      <section id="contacts-section">
        <Contacts />
      </section>

      <section id="footer-section">
        <Footer />
      </section>
    </main>
  );
}

export default App;
