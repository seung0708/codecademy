
import LoginForm from "../../components/LoginForm/LoginForm";
import './Login.css'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <LoginForm />
            <div className="redirect">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Login