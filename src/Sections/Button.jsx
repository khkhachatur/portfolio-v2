import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

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

    gsap.set(carRef.current, { opacity: 0 });
    // gsap.set(".svg-container", { height: "0px" });
    // gsap.set("svg", { height: "0px" });

    gsap.to(circleRef.current, {
      scale: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "bounce.Out",
      duration: 0.4,
    });
  });

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
    tl.to(".button-text", { opacity: 0, duration: 0.5 })
      .to(
        carRef.current,
        {
          opacity: 1,
        },
        "<"
      )
      .to(carRef.current, {
        duration: 700,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
        },
      })
      .to(pathRef.current, { opacity: 1 }, "<")
      // .to(".svg-container", { height: "3572px" })
      // .to("svg", { height: "3572px" })
      .fromTo(
        pathRef.current,
        { strokeDashoffset: pathLength },
        { strokeDashoffset: 0, duration: 700 },
        "<"
      );

    gsap.utils
      .toArray([
        { id: "#work-section", start: 0.2 },
        { id: "#projects-section", start: 0.4 },
        { id: "#education-section", start: 0.6 },
        { id: "#finish-section", start: 0.8 },
        { id: "#contacts-section", start: 1 },
      ])
      .forEach(({ id }) => {
        gsap.to(id, {
          autoAlpha: 1,
          duration: 0,
          scrollTrigger: {
            trigger: id,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
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
            src="/icons/f1car.png"
            alt="F1 car"
            className="button-car absolute z-2"
          />
        </div>
        <div className="svg-container z-30">
          <svg
            width="1055"
            height="3571"
            viewBox="0 0 1055 3571"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M525 0.5C525 0.5 517.988 114.726 567 140.5C625 171 780 129.5 901 196C979.396 239.086 1055.62 326.569 1053.5 416C1049 605.5 987.253 789.149 845.5 817.5C670.5 852.5 619.254 820.538 450.578 842.5C312.884 860.428 137.078 787 33.0779 872C-9.96222 907.177 -9.42214 944.5 33.0778 964.5C78.4737 985.863 213.693 968.613 259.078 990C350.149 1032.92 450.419 993.145 503 1079C567 1183.5 481 1470.12 484 1692C486.121 1848.85 508.747 2008.14 510 2165C512.155 2434.71 589.5 2710 478.5 2819C418.523 2877.9 201.253 2870.85 147.078 2962.5C94.6791 3051.14 93.7443 3209.13 189.5 3247C256.5 3273.5 277 3312 361.5 3353.5C419.617 3382.04 526.5 3362.58 526.5 3414.5C526.5 3468 526.5 3571 526.5 3571"
              stroke="#FFFCEE"
              stroke-width="2"
            />
          </svg>
        </div>
        <h4 className="button-text">click here</h4>
      </div>
    </section>
  );
};

export default Button;
