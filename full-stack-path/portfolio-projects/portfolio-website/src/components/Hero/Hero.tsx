import {useRef, useState, useEffect} from 'react';
import './Hero.css';

const icons = [
  { url: '/assets/images/html5.svg', style: { top: '10%', left: '50%' } },
  { url: '/assets/images/css3.svg', style: { top: '20%', left: '90%' } },
  { url: '/assets/images/javascript.svg', style: { top: '85%', left: '75%' } },
  { url: '/assets/images/react.svg', style: { top: '15%', left: '20%' } },
  { url: '/assets/images/redux.svg', style: { top: '30%', left: '5%' } },
  { url: '/assets/images/nodedotjs.svg', style: { top: '40%', left: '75%' } },
  { url: '/assets/images/express.svg', style: { top: '45%', left: '15%' } },
  { url: '/assets/images/github.svg', style: { top: '55%', left: '85%' } },
  { url: '/assets/images/git.svg', style: { top: '80%', left: '15%' } },
  { url: '/assets/images/npm.svg', style: { top: '76%', left: '40%' } },
  { url: '/assets/images/postgresql.svg', style: { top: '65%', left: '90%' } },
];


const Hero = () => {
    const heroContentRef = useRef(null);
    const [fadeProgress, setFadeProgress] = useState(0);
    const [hideImage, setHideImage] = useState(false);
    const [line1Visible, setLine1Visible] = useState(false);
    const [line2Visible, setLine2Visible] = useState(false);
    console.log(fadeProgress)
    console.log(hideImage)


    useEffect(() => {
        if (fadeProgress >= 0.98 && !hideImage) {
            const timeout = setTimeout(() => setHideImage(true), 300); 
            return () => clearTimeout(timeout);
        } else if (fadeProgress < 0.99 && hideImage) {
            setHideImage(false); // bring image back if scrolling up
        }
        
        if (fadeProgress >= 0.33 && !line1Visible) setLine1Visible(true);
        if (fadeProgress >= 0.66 && !line2Visible) setLine2Visible(true);
    
    }, [fadeProgress, line1Visible, line2Visible]);

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const maxScroll = e.target.scrollHeight - e.target.clientHeight;
        const progress = Math.min(scrollTop / maxScroll, 1);
        setFadeProgress(progress);
    };

    return (
        <section className="hero">
            <div className="icons-overlay">
                <div className="icons-container">
                {icons.map((icon, index) => (
                    <div key={index} className="floating-icon" style={icon.style}>
                    <div className="icon-wrapper">
                        <img src={icon.url} alt={`icon-${index}`} />
                    </div>
                    </div>
                ))}
                </div>
            </div>
            
            <div className="hero-content" ref={heroContentRef} onScroll={handleScroll}>
                {!hideImage && (
                    <div 
                        className="hero-image"
                        style={{
                            opacity: 1 - Math.min(fadeProgress * 3, 1),
                            transform: `translateY(-${fadeProgress * 100}px)`,
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                            height: `${250 * (1 - Math.min(fadeProgress * 2, 1))}px`
                        }}
                    >
                        <img
                            src="/assets/images/IMG_20190312_191356_018.jpg"
                            alt="Hero"
                            style={{
                                opacity: 1 - Math.min(fadeProgress * 3, 1),
                                transition: 'opacity 0.3s ease'
                            }}
                        />
                    </div>
                )}
                <div className="hero-text">
                    <h3 className={`text-line ${line1Visible ? 'visible' : ''}`}>
                        Hello, my name is Seung Kim
                    </h3>
                    <h3 className={`text-line ${line2Visible ? 'visible' : ''}`}>
                        I am a Full-Stack developer
                    </h3>
                </div>

                <div style={{ height: '1000px', background: 'transparent' }}></div>
            </div>
        </section>
    );
};

export default Hero;