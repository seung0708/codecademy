import './LoginForm.css'

const LoginForm = () => {
    return (
        <div className="login__form">
            <h2 className="login__title">Login</h2>
            <form className="login__form__form">
                <div className="login__form__form__input">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" placeholder="Email"  required/>
                </div>
                <div className="login__form__form__input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="Password" required/>
                </div>
                <button type="submit" className="login__form__form__button">Login</button>
            </form>
        </div>
    )
}

export default LoginForm