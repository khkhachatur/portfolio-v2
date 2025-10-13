import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Education = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".education-title",
        start: "top center",
        scrub: 1.5,
        pin: true,
        end: "+50%",
      },
    });

    tl.fromTo(
      ".education-img",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
      }
    )
      .fromTo(
        ".education-offset",
        { opacity: 0, y: -40, scale: 0.2 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          scale: 1,
          stagger: 0.5,
        }
      )
      .to(".education-title", { opacity: 0, duration: 2 }, "<");
  });

  return (
    <section className="education-section bg-[#0f0f0f]">
      <div className="flex flex-col justify-center items-center py-32 text-center gap-4">
        <h2 className="education-title">Education</h2>
        <img
          src="/images/msu.png"
          alt="MSU"
          className="education-img z-10 drop-shadow-xl"
        />
        <h3 className="education-state education-offset">
          Moscow State University
        </h3>
        <h4 className="education-degree education-offset">
          Computer Science & Math
        </h4>
        <p className="education-date education-offset">2017 – 2021</p>
      </div>
    </section>
  );
};

export default Education;
