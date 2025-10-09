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
    <section className="flex justify-center bg-[#0f0f0f] py-20 " id="finish">
      <img className="finish-line" src="icons/finish-line.png" alt="" />
    </section>
  );
};

export default Finish;
