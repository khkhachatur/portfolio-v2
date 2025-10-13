import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Finish = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#finish",
        start: "top 50%",
        scrub: 1,

        end: "bottom bottom",
      },
    });

    tl.fromTo(
      ".finish-line",
      { opacity: 0 },
      { opacity: 1, duration: 4, ease: "power1.in", yoyo: true }
    );
  });

  return (
    <section
      className="flex justify-center items-center bg-[#0f0f0f] py-32 z-0"
      id="finish"
    >
      <img
        className="finish-line w-[40vw] max-w-[400px]"
        src="icons/finish-line.png"
        alt=""
      />
    </section>
  );
};

export default Finish;
