import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { workExperiences } from "../Constants";

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRefs = useRef([]);
  const autoplayRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const animateTransition = (fromIndex, toIndex) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const currentCard = cardRefs.current[fromIndex];
    const nextCard = cardRefs.current[toIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.fromTo(
      currentCard,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.inOut",
      }
    ).fromTo(
      nextCard,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.3"
    );
  };

  const goToNext = () => {
    if (isAnimatingRef.current) return;
    const nextIndex = (currentIndex + 1) % workExperiences.length;
    animateTransition(currentIndex, nextIndex);
    setCurrentIndex(nextIndex);
  };

  const goToPrev = () => {
    if (isAnimatingRef.current) return;
    const prevIndex =
      currentIndex === 0 ? workExperiences.length - 1 : currentIndex - 1;
    animateTransition(currentIndex, prevIndex);
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    gsap.set(cardRefs.current, { opacity: 0, y: 30 });
    gsap.to(cardRefs.current[0], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, 4000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex, isHovered]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#69141F]  py-20 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Work Experience
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative min-h-[400px] flex items-center justify-center">
            {workExperiences.map((experience, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute w-full"
                style={{ opacity: 0 }}
              >
                <div className="bg-[#0f0f0f] backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {experience.pos}
                        </h3>
                        <p className="text-xl text-gray-300 mb-1">
                          {experience.name}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-400 bg-gray-800 px-4 py-2 rounded-full">
                        {experience.duration}
                      </span>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                      {experience.title}
                    </p>

                    {experience.span && (
                      <div className="pt-4 border-t border-gray-800">
                        <p className="text-sm text-gray-500 font-medium">
                          {experience.span}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={goToPrev}
              className="group flex items-center justify-center w-12 h-12    hover:bg-opacity-20 transition-all duration-300 "
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
            </button>

            <div className="flex gap-2">
              {workExperiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentIndex && !isAnimatingRef.current) {
                      animateTransition(currentIndex, index);
                      setCurrentIndex(index);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="ggroup flex items-center justify-center w-12 h-12    hover:bg-opacity-20 transition-all duration-300 "
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
