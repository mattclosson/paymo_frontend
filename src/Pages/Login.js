
import LoginForm from '../Components/LoginForm'
import logo from '../logo.svg'
import { Link } from 'react-router-dom';
const Login = (props) => {  
    return (
        <div className="login-signup-container">
            <Link to="/"><img src={logo} /></Link>
            <LoginForm />
            <span>Don't have an account? <Link to="/signup">Signup</Link></span>
        </div>
    )
}

export default Login