import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router';
import { useAuthState } from '../Context';

const InvoiceForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [qty, setQty] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
    const [amount, setAmount] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const [products, setProducts] = useState([])
	const userDetails = useAuthState();
    const navigate = useNavigate();

    const createProductStyle = {
        border: "1px solid #bbbbc7",
        padding: "20px",
        borderRadius: "5px",
        marginBottom: "20px"
    }

    const handleProduct = async (e) => {
        e.preventDefault();
        const amount = unitPrice * qty
        const newProduct = {
            description,
            qty,
            unitPrice,
            amount
        }
        await setProducts(oldProducts => [...oldProducts, newProduct])
        setDescription("")
        setQty("")
        setUnitPrice("")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let totalPrice = 0
        for(let i = 0; i < products.length; i++) {
            totalPrice = totalPrice + products[i].amount
        }
        const body = {
            name,
            email, 
            products,
            totalPrice,
            userId: userDetails.user._id
        }
        
        let response = await fetch("http://localhost:4000/api/invoice/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        let data = await response.json()
        console.log(data)
        navigate("/dashboard")
    }
    return (
        <div className="invoice-form-containter">
            <form className="auth-form">
                <input
                    id="name"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    id="email"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {products.length > 0 ? 
                    <div>{products.map((product, key) => {
                        return (
                            <div className="new-product" key={key}>
                                <div>{product.description}</div>
                                <div>{product.qty}</div>
                                <div>{product.unitPrice}</div>
                                <div>{product.amount}</div>
                            </div>
                        )
                    })}</div> : ''}
                <div style={createProductStyle}>
                    <input
                        id="description"
                        placeholder="Description"
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        id="qty"
                        placeholder="Quantity"
                        type="text"
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                    />
                    <input
                        id="unitPrice"
                        placeholder="Unit Price"
                        type="text"
                        value={unitPrice}
                        onChange={e => setUnitPrice(e.target.value)}
                    />
                <button className="login-btn" onClick={handleProduct}>Add Product</button>
                </div>
                <button className="login-btn" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default InvoiceForm