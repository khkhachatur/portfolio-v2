import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#start",
        start: "top top",
        scrub: 2.5,
        end: "+=200%",
        pin: true,
      },
    });

    //Animation preparations

    gsap.set("body", { background: "white" });
    gsap.set("#span-title", { opacity: 0 });
    gsap.set(".hero-desc", { opacity: 0 });
    gsap.set(".social-icon", { opacity: 0 });
    gsap.set(".hero-btn", { opacity: 0 });

    //text animations

    gsap.registerPlugin(SplitText);

    let splitTitle = SplitText.create(".hero-title", {
      type: "chars",
    });
    let splitSpan = SplitText.create("#title-span", {
      type: "chars",
    });

    let splitDesc = SplitText.create(".hero-desc", {
      type: "chars",
    });

    //Scroll to see my portfolio animation
    tl.fromTo(
      "#hero-title-1",
      {
        opacity: 1,
      },
      { opacity: 0, duration: 1 }
    )
      //Portfolio animation
      .fromTo(
        ".portfolio",
        {
          y: -120,
          color: "white",
          scale: 0.45,
        },
        { y: 0, scale: 1, direction: 3, color: "#69141F" },
        "<"
      )
      .to("body", { background: "#69141F", duration: 2 }, "<")
      //Sliced bg animation
      .fromTo(
        "#bg-slice",
        { y: "-100vh", rotate: -30, scale: 0.1, yoyo: true },
        {
          y: "0",
          duration: 3,
          ease: "power3.out",
          scale: 1,
          yoyo: true,
          stagger: 0.4,
          rotate: 0,
        },
        "<"
      )
      .fromTo(
        ".hero-bg",
        {
          opacity: 0,
          w: 0.9,
        },
        { opacity: 1, ease: "sine.in", w: 1 }
      )
      .to("#bg-slice", {
        opacity: 0,

        ease: "sine.out",
      })
      // Title animations
      .fromTo(
        splitTitle.chars,
        { opacity: 0, color: "white", y: 100, scale: 0.2, rotateY: 50 },
        {
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          stagger: 0.2,
          scale: 1,
          rotateY: 0,
          y: 0,
        }
      )
      .fromTo(
        splitSpan.chars,
        { opacity: 0.2, color: "#fff" },
        {
          opacity: 1,

          duration: 0.3,
          ease: "power2.out",
          stagger: 0.2,
        }
      )
      .to(
        splitSpan.chars,
        {
          color: "#69141F",
          textShadow: "0px 0px 8px #69141F",
          duration: 0.3,
          yoyo: true,
          stagger: 0.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        splitSpan.chars,
        {
          color: "#69141F",
          textShadow: "0px 0px 0px transparent",
          duration: 0.3,
          ease: "power1.out",
          stagger: 0.2,
        },
        "<+0.45"
      )
      //Description animation
      .to(".hero-desc", { opacity: 1, duration: 2 }, "<+0.3")
      .fromTo(
        splitDesc.chars,
        { opacity: 0.2, color: "#ffffff" },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.2,
        }
      )
      .to(
        splitDesc.chars,
        {
          color: "#69141F",
          textShadow: "0px 0px 8px #69141F",
          duration: 0.3,
          yoyo: true,
          stagger: 0.2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        splitDesc.chars,
        {
          color: "#ffffff",
          textShadow: "0px 0px 0px transparent",
          duration: 0.3,
          ease: "power1.out",
          stagger: 0.2,
        },
        "<+0.45"
      )

      //social section animation
      .fromTo(
        ".social-icon",
        {
          y: 50,
          scale: 0,
          rotate: -30,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          stagger: 0.5,
          direction: 1,
          ease: "back.inOut",

          yoyo: true,
        },
        "<+15"
      )
      //button animation
      .fromTo(
        ".hero-btn",
        {
          y: 80,
          scale: 0,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,

          stagger: 0.5,
          direction: 2,
          ease: "back.inOut",
          yoyo: true,
        },
        "<"
      );
  });

  return (
    <section>
      <div className="relative w-full overflow-hidden" id="start">
        <img src="/images/khachatur.png" alt="" className="hero-bg" />
        <div className="absolute flex justify-center">
          <img src="/images/bg-1.png" alt="" id="bg-slice" />
          <img src="/images/bg-2.png" alt="" id="bg-slice" />
          <img src="/images/bg-3.png" alt="" id="bg-slice" />
          <img src="/images/bg-4.png" alt="" id="bg-slice" />
          <img src="/images/bg-5.png" alt="" id="bg-slice" />

          <h2 className="hero-title-1" id="hero-title-1">
            Scroll to see my
          </h2>
        </div>
        <div className="hero-container c-space ">
          <div className="flex justify-center items-center gap-2">
            <h2 className="hero-title z-2">HI I'M</h2>
            <h2 className="text-[#69141F] hero-title " id="title-span">
              KHACHATUR{" "}
            </h2>
          </div>
          <div className="flex text-center items-center justify-center">
            <h3 class="hero-desc z-2">
              A fast-learning IT Developer &{" "}
              <span class="whitespace-nowrap">GIS Project Manager</span>, ready
              to take on new challenges and improve in the areas where I've
              already made an impact.
            </h3>
          </div>
          <div className="hero-social">
            <button className="hero-btn">Push me</button>
            <div className="flex items-center gap-5 z-32" id="social">
              <a
                href="https://github.com/khkhachatur"
                target="_blank"
                rel="noreferrer noopener"
                className="social-icon"
              >
                <img src="/icons/github.png" alt="githab-logo" />
              </a>
              <a
                href="https://www.instagram.com/khcho_k/"
                target="_blank"
                rel="noreferrer noopener"
                className="social-icon"
              >
                <img src="/icons/instagram.png" alt="githab-logo" />
              </a>
              <a
                href="https://web.telegram.org/#@kkkk_kkkk_kkkk_k"
                target="_blank"
                rel="noreferrer noopener"
                className="social-icon"
              >
                <img src="/icons/telegram.png" alt="githab-logo" />
              </a>
            </div>
          </div>
          <h1 className="portfolio z-31">PORTFOLIO</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
