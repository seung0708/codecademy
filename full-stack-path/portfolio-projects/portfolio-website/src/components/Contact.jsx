import React from 'react'

const Contact = () => {
  return (
    <section id="contact">
            <div className="container">
                <div className="contact_heading">
                    <h2>Contact Me</h2>
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
                </div>
                <div className="contact_form">
                    <form>
                        <div className="contact_form_field">
                            <label>Name:</label>
                            <input type="text" id="name" name="name" required/>
                        </div>
                        <div className="contact_form_field">
                            <label>Email:</label>
                            <input type="email" id="email" name="email" required/>
                        </div>
                        <div className="contact_form_field">
                            <label>Subject:</label>
                            <input type="text" id="subject" name="subject" required/>
                        </div>
                        <div className="contact_form_field">
                            <label>Message:</label>
                            <textarea required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default Contact