import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

const Button = () => {
  const carRef = useRef(null);
  const circleRef = useRef(null);
  const sectionRef = useRef(null);
  const [activated, setActivated] = useState(false);

  useGSAP(() => {
    gsap.set(circleRef.current, { scale: 0.3 });
    gsap.set(carRef.current, { opacity: 0 });
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".button-section",
        start: "top 20%",
        scrub: 2.5,
        end: "+200%",
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
      .to(carRef.current, { y: 400 }, "<");
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
        <h4 className="button-text">click here</h4>
      </div>
      <p className="w-[200px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim error cum
        ea debitis adipisci vero maxime, aliquid inventore magnam esse
        exercitationem placeat accusamus laborum temporibus qui repellat? Eos,
        quasi optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi
        optio! quasi optio! quasi optio! quasi optio! exercitationem placeat
        accusamus laborum temporibus qui repellat? Eos, quasi optio! quasi
        optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi optio!
        quasi optio! quasi optio! exercitationem placeat accusamus laborum
        temporibus qui repellat? Eos, quasi optio! quasi optio! quasi optio!
        quasi optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi
        quasi optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi
        optio! quasi optio! quasi optio! quasi optio! exercitationem placeat
        accusamus laborum temporibus qui repellat? Eos, quasi optio! quasi
        optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi optio!
        quasi optio! quasi optio! exercitationem placeat accusamus laborum
        temporibus qui repellat? Eos, quasi optio! quasi optio! quasi optio!
        quasi optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi
        quasi optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi
        optio! quasi optio! quasi optio! quasi optio! exercitationem placeat
        accusamus laborum temporibus qui repellat? Eos, quasi optio! quasi
        optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi optio!
        quasi optio! quasi optio! exercitationem placeat accusamus laborum
        temporibus qui repellat? Eos, quasi optio! quasi optio! quasi optio!
        quasi optio! quasi optio! quasi optio! quasi optio! quasi optio! quasi
        optio!
      </p>
    </section>
  );
};

export default Button;
