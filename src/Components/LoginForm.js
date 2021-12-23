import React, { useState } from "react"
import { loginUser, useAuthState, useAuthDispatch } from '../Context' 
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, errorMessage } = useAuthState() 

    const dispatch = useAuthDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        let payload = {email, password}
        try {
            let response = await loginUser(dispatch, payload)
            if (!response) return
            navigate('/dashboard') 
        } catch (err) {
            console.log(err)
        }
    }

    console.log(errorMessage)
    return (
        <div className="login-container">
            {errorMessage ? <div className="error">{errorMessage}</div> : ''}
            <form className="auth-form">
                <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default LoginForm