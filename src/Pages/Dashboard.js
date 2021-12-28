import React, { useEffect, useState } from 'react';
import { useAuthDispatch, logout, useAuthState } from '../Context';
import { useNavigate, Link } from 'react-router-dom'
import authHeader from '../utils/AuthService';

const Dashboard = () => {
	const dispatch = useAuthDispatch();
	const userDetails = useAuthState();
    console.log(userDetails.user)
    const navigate = useNavigate();
    const [originalInvoices, setOriginalInvoices] = useState([])
    const [invoices, setInvoices] = useState([{billTo: "Bob"}])

    const getAllInvoices = async () => {
        const token = userDetails.token
        let response = await fetch('https://mc-paymo.herokuapp.com/api/invoice/stripe', {headers: authHeader({token})})
        let data = await response.json()
        let dataArray = await data.data
        const allInvoices = dataArray.filter((invoice) => invoice.status != "void")
        setInvoices(allInvoices)
        setOriginalInvoices(allInvoices)
    }

    useEffect(() => {
        getAllInvoices()
    }, [])
    
    const handleDelete = async (e) => {
        e.preventDefault()
        const id = e.target.value
        await fetch(`https://mc-paymo.herokuapp.com/api/invoice/${id}`, {
            method: "DELETE"
        })
        getAllInvoices()
    }

    const formatMoney = (amount) => {
        amount = amount / 100
        return amount.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }

    const handlePaid = async (e) => {
        e.preventDefault()

        const paidInvoices = originalInvoices.filter((invoice) => invoice.status == "paid")
        setInvoices(paidInvoices)
    }

    const handleUnpaid = async (e) => {
        e.preventDefault()

        const openInvoices = originalInvoices.filter((invoice) => invoice.status == "draft" || invoice.status == "open")
        setInvoices(openInvoices)
    }

	return (
		<div>
            <h1>Hello, {userDetails.user.firstName} {userDetails.user.lastName}</h1>
            <div className="sort-container">
                <button onClick={getAllInvoices} style={{borderRadius: "6px 0 0 6px"}}>All</button>
                <button onClick={handlePaid} style={{borderLeft:"none", borderRight:"none",borderRadius:"0"}}>Paid</button>
                <button onClick={handleUnpaid} style={{borderRadius: "0 6px 6px 0"}}>Unpaid</button>
            </div>
            <div className="invoice-home-header">
                <div>Customer Name</div>
                <div>Amount Due</div>
                <div>Status</div>
            </div>
            {invoices ? invoices.map((invoice, key) => (
                <div className="invoice-home-container" key={key}>
                    <div><Link to={`../invoice/${invoice.id}`}>{invoice.customer_name}</Link></div>
                    <div>{formatMoney(invoice.amount_due)}</div>
                    <div>{invoice.status}</div>
                </div>
            )) : ''}
		</div>
	);
}

export default Dashboard;