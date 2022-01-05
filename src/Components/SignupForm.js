import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { signupUser, useAuthState, useAuthDispatch } from '../Context' 

const SignupForm = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [step, useStep] = useState("account")
    const dispatch = useAuthDispatch()

    const { loading, errorMessage } = useAuthState() 

    const client_id = process.env.REACT_APP_clientId

    const handleSignup = async (e) => {
        e.preventDefault()
        let payload = {email, password, firstName, lastName}
        try {
            let response = await signupUser(dispatch, payload)
            if (!response) return
            window.location.assign(`https://connect.stripe.com/express/oauth/authorize?client_id=${client_id}&redirect_uri=${PROCESS.env.REACT_APP_BACKEND}/api/stripe/token&stripe_user%5Bbusiness_type%5D=individual&stripe_user%5Bbusiness_name%5D=&stripe_user%5Bfirst_name%5D=${payload.firstName}&stripe_user%5Blast_name%5D=${payload.lastName}&stripe_user%5Bemail%5D=${payload.email}&stripe_user%5Bcountry%5D=US#/`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="signup-container">
            {errorMessage ? <div className="error">{errorMessage}</div> : ''}
            <form className="auth-form">
                <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                />
                <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <input
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
                />
                <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
                />
                <button onClick={handleSignup} className="signup-btn">Signup</button>
            </form>
        </div>
    )
}

export default SignupForm