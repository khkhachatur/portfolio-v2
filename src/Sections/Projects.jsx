import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { myProjects } from "../Constants/index";

const Projects = () => {
  useGSAP(() => {
    gsap.from(".project-card", {
      opacity: 0,
      y: 80,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      className="projects-section py-24 bg-[#0f0f0f] text-white"
      id="projects"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-12 text-center">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {myProjects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
            >
              <div className="relative aspect-video overflow-hidden">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <p className="text-gray-400">No Preview</p>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl"
                  style={project.logoStyle}
                >
                  <img
                    src={project.logo}
                    alt={project.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-gray-300">{project.desc}</p>
                <p className="text-gray-500 text-sm">{project.subdesc}</p>

                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-400 hover:text-blue-300"
                  >
                    Visit project →
                  </a>
                )}

                <div className="flex gap-4 flex-wrap pt-2">
                  {project.tags.map((tag) => (
                    <div key={tag.id} className="flex items-center gap-2">
                      {tag.path && (
                        <img
                          src={tag.path}
                          alt={tag.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span className="text-gray-400 text-sm">{tag.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
