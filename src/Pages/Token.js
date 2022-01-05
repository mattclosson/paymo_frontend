import React, { useState } from 'react';
import { useAuthDispatch, logout, useAuthState, updateUser } from '../Context';
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react/cjs/react.development';

function useQuery() {
    return new URLSearchParams(window.location.search);
  }

const sendToken = async (props) => {
    // console.log(props)
    const token = props.token
    let response = await fetch(`${PROCESS.env.REACT_APP_BACKEND}/api/stripe/token?code=${props.code}`)
    let data = await response.json()
    const stripe_user_id = data.expressAuthorized.stripe_user_id
    let newUser = await updateStripeId({stripe_user_id, token})
    return newUser
}

const updateStripeId = async (props) => {
    const token = props.token
    console.log(token)
    const stripe_user_id = props.stripe_user_id
    let response = await fetch(`${PROCESS.env.REACT_APP_BACKEND}/api/user/update`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type':'application/json'
        },
        body: JSON.stringify({ stripe_user_id })
    })
    let data = await response.json()
    return data
}

const Token = () => {
    const navigate = useNavigate()
	const userDetails = useAuthState();
	const dispatch = useAuthDispatch();
    const [isStripeId, setStripeId] = useState(false)

    let token = userDetails.user.token
    let code = useQuery().get('code');
    const stripe_user_id = sendToken({code, token})

    useEffect(() => {
        if(stripe_user_id) {
            updateUser(dispatch, token)
            navigate("/dashboard")
        }
    }, [])
    return (
        <div>Loading ...</div>
    )
}

export default Token