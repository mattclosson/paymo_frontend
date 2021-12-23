import React from "react"
import { Link } from "react-router-dom";
import SignupForm from "../Components/SignupForm"
import logo from '../logo.svg'

const Signup = () => {
    return (
        <div className="login-signup-container">
            <Link to="/"><img src={logo} /></Link>
            <SignupForm />
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </div>
    )

}

export default Signup