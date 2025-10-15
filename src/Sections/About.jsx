import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const About = () => {
  console.log("About is here");

  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    let splitDesc = SplitText.create("#about-span", {
      type: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom ",
        scrub: 2.5,
        end: "bottom 50%",
      },
    });

    tl.fromTo(
      ".about-desc",
      { opacity: 0 },
      { duration: 2, opacity: 1, yoyo: true, ease: "power1.inOut" }
    )
      .fromTo(
        splitDesc.chars,
        { opacity: 0.2, color: "#FFFCEE" },
        {
          opacity: 1,
          duration: 0.3,
          delay: 2,
          ease: "power2.out",
          stagger: 0.2,
        }
      )
      .to(
        splitDesc.chars,
        {
          color: "#B52437",
          textShadow: "0px 0px 8px #B52437",
          duration: 0.1,
          yoyo: true,
          stagger: 0.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        splitDesc.chars,
        {
          color: "#FFFCEE",
          textShadow: "0px 0px 0px transparent",
          duration: 0.1,
          ease: "power1.out",
          stagger: 0.2,
        },
        "<+0.45"
      );
  });

  return (
    <section
      id="about"
      className="flex justify-center items-center py-[120px] relative"
    >
      <div className="flex justify-center c-space">
        <p className="about-desc">
          Hi, I’m Khachatur, a results-driven{" "}
          <span id="about-span">frontend and GIS specialist </span>
          developer with experience in geospatial data, web applications, and
          team coordination.{" "}
          <span id="about-span">I love solving complex problems</span>, whether
          it’s optimizing data workflows or building intuitive user interfaces.
          Skilled at learning fast, improving processes, and collaborating with
          diverse, remote teams to deliver real results.
        </p>
      </div>
    </section>
  );
};

export default About;
