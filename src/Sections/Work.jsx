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
    <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:py-12 sm:px-6 md:px-10">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16 sm:mb-12">
          <h2
            className="text-4xl sm:text-3xl md:text-5xl font-bold text-white mb-4"
            id="work-title"
          >
            Work Experience
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative min-h-[420px] sm:min-h-[380px] flex items-center justify-center">
            {workExperiences.map((experience, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute w-full"
                style={{ opacity: 0 }}
              >
                <div className="bg-[#0f0f0f]/90 backdrop-blur-md rounded-2xl p-6 sm:p-5 md:p-8 shadow-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-xl font-bold text-white mb-2">
                          {experience.pos}
                        </h3>
                        <p className="text-lg sm:text-base text-gray-300 mb-1">
                          {experience.name}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-400 bg-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                        {experience.duration}
                      </span>
                    </div>

                    <p className="text-gray-300 text-base sm:text-sm md:text-lg leading-relaxed">
                      {experience.title}
                    </p>

                    {experience.span && (
                      <div className="pt-4 border-t border-gray-800">
                        <p className="text-xs sm:text-sm text-[#982735] font-medium">
                          {experience.span}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-10 sm:mt-8">
            <button
              onClick={goToPrev}
              className="group flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 hover:bg-gray-800/30 rounded-full transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
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
                      ? "w-6 sm:w-5 bg-white"
                      : "w-2 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="group flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 hover:bg-gray-800/30 rounded-full transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
