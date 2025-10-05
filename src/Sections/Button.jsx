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
    gsap.to(circleRef.current, {
      scale: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "bounce.Out",
      duration: 0.4,
    });
    // gsap.set(carRef.current, { opacity: 0 });
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
        scrub: 1,
        end: "+100%",
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
        duration: 800,
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
        },
      })
      .to(pathRef.current, { opacity: 1 }, "<")
      .fromTo(
        pathRef.current,
        { strokeDashoffset: pathLength },
        { strokeDashoffset: 0, duration: 800 },
        "<"
      );
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
        <div className="svg-container">
          <svg
            className="h-full"
            width="1120"
            height="3572"
            viewBox="0 0 1120 3572"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M558 0C558 0 560 227 572.5 334.5C597.892 552.869 817 382 957.581 433C1098.16 484 1111.5 574 1118 676C1124.5 778 1074.62 950.66 957.581 980.5C810.5 1018 753.183 1005.5 601.581 1005.5C397.581 1005.5 279.546 982.283 145.581 1106C57.8576 1187.01 -8.33966 1257.05 2.08096 1376C15.8716 1533.42 175.403 1560 317.081 1630C462.299 1701.75 721.406 1564.03 720.581 1726C720.135 1813.55 672.192 1864.24 601.581 1916C525.671 1971.65 392.182 1878.93 366.581 1969.5C348.1 2034.88 414.484 2064.58 436.081 2129C454.461 2183.83 461.525 2215.74 472.581 2272.5C501.763 2422.32 575.906 2537.46 489.081 2663C396.68 2796.6 170.382 2633.46 88.081 2773.5C58.9314 2823.1 51.1453 2857.61 47.081 2915C38.3268 3038.61 75.1244 3127.88 170.081 3207.5C267.657 3289.31 412.765 3173.07 489.081 3275C558.478 3367.69 489.081 3571.5 489.081 3571.5"
              stroke="white"
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
