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
        endTrigger: "#finish-section",
        scrub: 1.5,
        ease: "none",
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
        // { id: "#responsive-section", start: 0.8 },
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
            className="button-circle"
            onClick={handleClick}
          ></div>
          <img
            ref={carRef}
            src="/icons/f1car1.png"
            alt="F1 car"
            className="button-car absolute"
          />
        </div>
        <div className="svg-container ">
          <svg
            viewBox="0 0 1231 2984"
            preserveAspectRatio="xMidYMin meet"
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ width: "1231px", height: "2984px" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M616.5 1.5C616.5 1.5 785.095 6.50002 914.095 29.5C1111.49 64.6939 875.934 220.022 1071.1 266C1270.6 313 1258.23 633.545 1158.1 752C1074.7 850.646 973.503 766.381 847 792.5C671.353 828.766 585.34 887.76 407.5 911C231.5 934 78.1791 1108.78 41.3421 1233.5C-28.6579 1470.5 -17.3427 1726.19 175.095 1870C313.595 1973.5 417.882 1891.04 572.095 1912.5C678.957 1927.37 763.449 2034.65 870.095 2051C948.802 2063.06 886.659 2129.92 917.095 2203.5C968.595 2328 1024.59 2255 1075.96 2362C1104.03 2420.49 938.444 2608.09 888.5 2649.5C807.877 2716.35 614.5 2673.77 614.5 2778.5C614.5 2856 614.5 2983.5 614.5 2983.5"
              stroke="#FFFCEE"
              strokeWidth="3"
              ref={pathRef}
              fill="none"
            />
          </svg>
        </div>
        <h4 className="button-text">click here</h4>
      </div>
    </section>
  );
};

export default Button;
