import React from 'react';
import './Contact.css';
import {Mail} from 'lucide-react'

const Contact = () => {
    return (
    <section id="contact">
            <div className="contact-container">
                <div className="form-container">
                    <div className='left-container'>
                        <h2>Let's Chat</h2>
                        <p className="contact-text">Whether you have a question, want to start a project, or simply want to connect</p>
                        <br/>
                        <p>Feel free to send me a message</p>
                    </div>
                    <div className='right-container'>
                       <form action="#">
			                <h2 class="lg-view">Contact</h2>
                			<input type="text" placeholder="Name *"  />
                            <input type="email" placeholder="Email *" />
			                <input type="text" placeholder="Company" />
			                <input type="phone" placeholder="Phone" />
                            <textarea rows="4" placeholder="Message"></textarea>
			                <button>Submit</button>
		                </form>
                    </div>
                </div>
                
                
                {/* <div className="contact-cards">
                    <div className='contact-card'>
                        <Mail />
                        <h3>Email: <span>seung.kim0708@gmail.com</span></h3>
                    </div>

                    <h2>Contact me!</h2>
                    <p>Say hello @ seung.kim0708@gmail.com</p>
                    <p>For my info, here's my <a href="./assets/General Resume (2).pdf">resume</a></p>
                    <div className="social_links">
                        <a href="https://www.linkedin.com/in/seung-kim-8a3469133/">
                            <img src="./assets/images/linkedin.png" />
                        </a>
                        <a href="https://github.com/seung0708">
                            <img src="./assets/images/github.svg" />
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
  )
}

export default Contact