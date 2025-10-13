import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Play } from "lucide-react";

import { myProjects } from "../Constants/index";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const videoRefs = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in title
      gsap.from(".projects-title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate cards in
      gsap.from(".project-card", {
        opacity: 0,
        y: 80,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });

      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 2.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredProject(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play().catch(() => {});
    }
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
      ref={sectionRef}
      id="projects"
      className="project-container flex flex-col items-center justify-center py-24"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="projects-title text-center mb-20 px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            A selection of my most creative and technical works
          </p>
        </div>

        <div
          ref={gridRef}
          className=" grid grid-cols-1 gap-y-14  px-4 sm:px-8 md:px-16 lg:px-24"
        >
          {myProjects.map((project, index) => (
            <div
              key={index}
              className="project-card group mx-auto"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Background video */}
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-opacity duration-700" />

              <div className="absolute bottom-0 p-6 flex flex-col justify-end z-10">
                <h3
                  className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                    hoveredProject === index ? "text-main-red" : "text-white"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 ">{project.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 text-xs bg-white/10 rounded-full text-gray-300"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-all"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-all"
                  >
                    <Github size={14} /> Code
                  </a>
                </div>
              </div>

              <div className="absolute top-4 right-4 text-xs bg-main-red/80 px-3 py-1 rounded-full font-medium">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-20 flex flex-col items-center gap-4">
        <p className="text-gray-400 text-sm md:text-base tracking-wide">
          Hover to preview | Scroll to explore
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
};

export default Projects;
