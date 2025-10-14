import { useEffect, useRef, useState } from "react";
import Core from "smooothy";
import gsap from "gsap";
import { ExternalLink, Github } from "lucide-react";
import { myProjects } from "../Constants/index";

import Title from "../Components/Title";

function useSmooothy(config = {}) {
  const sliderRef = useRef(null);
  const [slider, setSlider] = useState(null);

  const refCallback = (node) => {
    if (node && !slider) {
      const instance = new Core(node, config);
      gsap.ticker.add(instance.update.bind(instance));
      setSlider(instance);
    }
    sliderRef.current = node;
  };

  useEffect(() => {
    return () => {
      if (slider) {
        gsap.ticker.remove(slider.update.bind(slider));
        slider.destroy();
      }
    };
  }, [slider]);

  return { ref: refCallback, slider };
}

export default function Projects() {
  const { ref } = useSmooothy({ direction: "horizontal", lerp: 0.3 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    setHoveredProject(index);
    if (videoRefs.current[index])
      videoRefs.current[index].play().catch(() => {});
  };

  const handleMouseLeave = (index) => {
    setHoveredProject(null);
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section
      id="projects"
      className="project-container flex flex-col items-center justify-center py-24 overflow-hidden bg-[#0f0f0f]"
    >
      <div className=" text-center mb-20 px-6">
        <Title secTitle="Featured Projects" />
        <p className="text-gray-300 text-base md:text-lg">
          A selection of my most creative and technical works
        </p>
      </div>
      <div
        className="py-sm pb-xl flex w-screen overflow-x-hidden px-[calc(50%-40vw)] focus:outline-none md:px-[calc(50%-30vw)]"
        ref={ref}
      >
        {myProjects.map((project, index) => (
          <div
            key={index}
            className="flex aspect-[16/9] w-[80vw] md:w-[60vw] shrink-0 items-center justify-center p-4"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                {project.video && (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredProject === index
                        ? "opacity-100 scale-105"
                        : "opacity-40 scale-100"
                    }`}
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

              {/* Text content */}
              <div className="absolute bottom-0 p-6 flex flex-col justify-end z-10">
                <h3
                  className={`lg:text-2xl md:text-xl sm:text-lg text-[xs] font-bold mb-2 transition-colors duration-300 ${
                    hoveredProject === index ? "text-main-red" : "text-white"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-gray-300  lg:text-sm md:text-xs sm:text-[10px] text-[7px] sm:mb-4 mb-1">
                  {project.desc}
                </p>

                <div className="flex flex-wrap sm:gap-2 gap-0.5 sm:mb-4 mb-1">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="sm:px-3 px-1 sm:py-1 py-0.5 lg:text-sm md:text-[10px] sm:text-[10px] text-[7px] bg-white/10 rounded-full text-gray-300"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="flex sm:gap-3 gap-1">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center sm:gap-2 gap-1 sm:px-3 px-1 sm:py-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg lg:text-sm md:text-[10px] sm:text-[10px] text-[7px] transition-all"
                    >
                      <ExternalLink className="lg:w-5 sm:w-3 w-2" /> Demo
                    </a>
                  )}
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center sm:gap-2 gap-1 sm:px-3 px-1 sm:py-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg lg:text-sm md:text-[10px] sm:text-[10px] text-[7px] transition-all"
                  >
                    <Github className="lg:w-5 sm:w-3 w-2" /> Code
                  </a>
                </div>
              </div>

              <div className="absolute top-4 right-4 sm:text-xs text-[8px] bg-main-red/80 sm:px-3 px-1.5 sm:py-1 py-0.5 rounded-full font-medium">
                0{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20 flex flex-col items-center gap-4">
        <p className="text-gray-400 text-sm md:text-base tracking-wide">
          Hover to preview | Smooth horizontal scroll
        </p>
        <a
          href="https://github.com/khkhachatur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-red bg-white px-4 py-2 text-sm md:text-base rounded-lg opacity-70 hover:opacity-100 transition-all duration-300 font-medium"
        >
          See more
        </a>
      </div>
    </section>
  );
}
