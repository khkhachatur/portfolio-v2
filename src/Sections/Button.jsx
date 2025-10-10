import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

const Button = () => {
  const carRef = useRef(null);
  const circleRef = useRef(null);
  const pathRef = useRef(null);
  const [activated, setActivated] = useState(false);

  useGSAP(() => {
    gsap.set(circleRef.current, { scale: 0.3 });
    gsap.set(carRef.current, { opacity: 0 });
    gsap.set(pathRef.current, {
      strokeDasharray: pathRef.current.getTotalLength(),
      opacity: 0,
    });

    gsap.set(carRef.current, { opacity: 0, scale: 0 });
    gsap.set(".svg-container", { height: "0px" });
    gsap.set("svg", { height: "0px" });

    gsap.to(circleRef.current, {
      scale: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "bounce.Out",
      duration: 0.4,
    });
  });

  useEffect(() => {
    const handleResize = () => {
      gsap.delayedCall(0.3, () => ScrollTrigger.refresh());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (activated) return;
    setActivated(true);

    const pathLength = pathRef.current.getTotalLength();
    // console.log("Path length:", pathLength);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".button-section",
        start: "top 20%",
        scrub: 1.3,
        endTrigger: "#finish-section",
      },
    });

    gsap.to(circleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(
      carRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    );
    tl.to(".button-text", { opacity: 0, duration: 0.5 })

      .to(carRef.current, {
        duration: 700,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      })
      .to(pathRef.current, { opacity: 1 }, "<")
      .to(".svg-container", { height: "auto" }, "<")
      .to("svg", { height: "auto" }, "<")
      .fromTo(
        pathRef.current,
        { strokeDashoffset: pathLength },
        { strokeDashoffset: 0, duration: 700 },
        "<"
      );

    gsap.utils
      .toArray([
        { id: "#work-section", start: 0.16 },
        { id: "#projects-section", start: 0.32 },
        { id: "#education-section", start: 0.48 },
        { id: "#finish-section", start: 0.64 },
        { id: "#responsive-section", start: 0.8 },
        { id: "#contacts-section", start: 1 },
      ])
      .forEach(({ id }) => {
        gsap.to(id, {
          autoAlpha: 1,
          display: "block",
          duration: 0,
          scrollTrigger: {
            trigger: id,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            onEnter: () => {
              ScrollTrigger.refresh();
            },
          },
        });
      });
  };

  return (
    <section>
      <div className="button-section">
        <h4 className="button-text">let’s explore my path together</h4>
        <div className="relative flex flex-col justify-center items-center ">
          <div
            ref={circleRef}
            className="button-circle z-10"
            onClick={handleClick}
          ></div>
          <img
            ref={carRef}
            src="/icons/f1car1.png"
            alt="F1 car"
            className="button-car absolute z-32"
          />
        </div>
        <div className="svg-container z-30">
          <svg
            viewBox="0 0 1055 3631"
            preserveAspectRatio="none"
            className="absolute top-0 left-0 w-full h-full px-50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M525 1.49988C525 1.49988 591 1.4999 676.5 1.49998C749.5 1.50004 694.5 155 901 197C988.661 214.829 1055.62 327.569 1053.5 417C1049 606.5 987.253 790.149 845.5 818.5C670.5 853.5 619.254 821.538 450.578 843.5C312.884 861.428 137.078 788 33.0779 873C-9.96222 908.177 -9.42214 945.5 33.0778 965.5C78.4737 986.863 213.693 969.613 259.078 991C350.149 1033.92 549.367 951.107 583 1046C625 1164.5 475 1128.62 478 1350.5C480.121 1507.35 620.49 1488.18 583 1640.5C545.51 1792.82 375.5 1864 548 2086C654.453 2223 482.747 2252.63 473 2421C464.403 2569.51 650.5 2675.5 548 2733C385 2820.5 257.5 2879.5 160 2977.5C107.634 3030.13 93.7443 3210.13 189.5 3248C256.5 3274.5 233 3341.5 317.5 3383C375.617 3411.54 526.5 3404.58 526.5 3456.5C526.5 3510 526.5 3577.5 526.5 3577.5"
              stroke="#FFFCEE"
              fill="none"
              stroke-width="2"
              ref={pathRef}
            />
          </svg>
        </div>
        <h4 className="button-text">click here</h4>
      </div>
    </section>
  );
};

export default Button;
