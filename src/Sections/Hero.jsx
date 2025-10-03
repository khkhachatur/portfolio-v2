const Hero = () => {
  return (
    <section>
      <div className=" bg-[url(/images/khachatur.png)] bg-cover bg-center">
        <div className="hero-container c-space">
          <h2 className="hero-title">
            HI I'M<span className="text-[#69141F] ml-2">KHACHATUR</span>
          </h2>
          <h3 className="hero-desc">
            A fast-learning IT Developer & GIS Project Manager, ready to take on
            new challenges and improve in the areas where I've already made an
            impact.
          </h3>
          <div className="hero-social">
            <button className="hero-bnt">Push me </button>
            <div className="flex items-center gap-5">
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
          <h1 className="portfolio">PORTFOLIO</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
