import "./Hero.css";

const icons = [
  { url: "/assets/images/html5.svg", top: 10, left: 50 },
  { url: "/assets/images/css3.svg", top: 20, left: 90 },
  { url: "/assets/images/javascript.svg", top: 85, left: 75 },
  { url: "/assets/images/react.svg", top: 15, left: 20 },
  { url: "/assets/images/redux.svg", top: 30, left: 5 },
  { url: "/assets/images/nodedotjs.svg", top: 40, left: 75 },
  { url: "/assets/images/express.svg", top: 45, left: 15 },
  { url: "/assets/images/github.svg", top: 55, left: 85 },
  { url: "/assets/images/git.svg", top: 80, left: 15 },
  { url: "/assets/images/npm.svg", top: 76, left: 40 },
  { url: "/assets/images/postgresql.svg", top: 65, left: 90 },
];

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-icon-container">
        <img
          src="/assets/images/IMG_20190312_191356_018.jpg"
          alt="Hero"
          className="hero-image"
        />

        {icons.map((icon, index) => (
          <div
            key={index}
            className="floating-icon"
            style={{ top: `${icon.top}%`, left: `${icon.left}%` }}
          >
            <div className="icon-wrapper">
              <img src={icon.url} alt={`icon-${index}`} />
            </div>
          </div>
        ))}
      </div>
      <div className='cta'>
          <button>Resume</button>
        </div>
    </section>
  );
};

export default Hero;
