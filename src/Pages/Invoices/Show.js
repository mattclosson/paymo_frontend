import { useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useAuthState } from '../../Context';
import authHeader from '../../utils/AuthService';

const Show = (props) => {
	const userDetails = useAuthState();
    let urlParams = useParams();
    console.log(urlParams.id)
    const [invoice, setInvoice] = useState({})

    const getInvoice = async () => {
        const token = userDetails.token
        const response = await fetch(`http://localhost:4000/api/invoice/${urlParams.id}`, {headers: authHeader({token})})
        const data = await response.json()
        console.log(data)
        setInvoice(data)
    }

    useEffect(() => {
        getInvoice()
    }, [])

    const formatMoney = (amount) => {
        amount = amount / 100
        return amount.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }

    const handleSend = async () => {
        const token = userDetails.token
        const response = await fetch(`http://localhost:4000/api/invoice/send/${invoice.id}`, {headers: authHeader({token})})
        const data = await response.json()
        getInvoice()
    }
    return (
        <div>
            <div className="invoice-header">
                <div className="invoice-name">
                    <h1 style={{marginBottom:0}}>Invoice for {invoice.customer_name}</h1>
                    {invoice.paid ? <h3 style={{marginTop:0}}>Paid</h3> : <h3 style={{marginTop:0}}>Unpaid</h3>}
                </div>
                <div className="invoice-links">
                    {invoice.invoice_pdf ? <><button onClick={handleSend}>Send</button><a href={invoice.invoice_pdf} target="_blank">Download PDF</a>
                    <a href={invoice.hosted_invoice_url} target="_blank">View Checkout</a></> : <button onClick={handleSend}>Send</button>}
                    
                </div>
            </div>
            <h3>Bill To:</h3>
            <div className="bill-to">
                <p>Name: {invoice.customer_name}</p>
                <p>Email: {invoice.customer_email}</p>
            </div>

            <div className="invoice-products-header">
                <span>Description</span>
                <span>Unit Amount</span>
                <span>Quantity</span>
                <span>Total Amount</span>
            </div>
            {invoice.lines ? <div>{invoice.lines.data.map((product, index) => (
                <div className="invoice-container" key={index}>
                    <div>{product.description}</div>
                    <div>{product.price.unit_amount}</div>
                    <div>{product.quantity}</div>
                    <div>{formatMoney(product.amount)}</div>
                </div>
            ))}</div> : ''}
            <div className="total-amount-due">
                <div>Total Amount Due:</div>
                <div style={{fontWeight:"bold"}}>{formatMoney(invoice.amount_due)}</div>
            </div>
        </div>
    )
}

export default Show