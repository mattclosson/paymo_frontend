import React, { useEffect } from "react"
import authHeader from '../utils/AuthService';
import { useAuthDispatch, updateUser, useAuthState } from '../Context';
import illustration from '../undraw_attached_file_re_0n9b.svg'
import logo from '../paymo-white.svg'
import { Link } from 'react-router-dom';

function Home() {  
	const dispatch = useAuthDispatch();
	const userDetails = useAuthState();
    const token = userDetails.token;
    // console.log(token)
    useEffect(() => {
        const newUser = updateUser(dispatch, token)
        console.log(newUser)
    }, [])
    
    return (
        <div className="home-container">
            <div className="home-header">
                <div className="home-nav">
                    <div className="logo">
                        <Link to="/"><img src={logo} /></Link>
                    </div>
                    <div className="nav">
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="home-header-content">
                    <div className="details">
                        <h1 style={{fontSize:"60px"}}>Quickly send invoices today</h1>
                        <p>Easy to create invoices.</p>
                        <Link to="/signup" className="get-started">Get Started</Link>
                    </div>
                    <div className="illustration">
                        <img src={illustration} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home