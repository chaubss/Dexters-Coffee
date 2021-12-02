import React, { useState, useEffect } from 'react'

function BuynSell(props) {

    const [amount, setAmount] = useState(0)


    const clickBuyBtn = (e) => {
        e.preventDefault()
        props.buyFunction(amount)
    }

    const clickSellBtn = (e) => {
        e.preventDefault()
        props.sellFunction(amount)
    }

    const updateAmount = (e) => {
        setAmount(e.target.name == "amount" ? e.target.value : amount)
    }

    return (
        <div>
            <form>
                <h2>Buy/Sell RET USING ETH</h2>
                <br />
                <div className="entry-header">AMOUNT OF RET</div>
                <div className="entry-input-container">
                    <input width="pixels" className="entry-input" value={amount} onChange={updateAmount} name="amount"></input>
                </div>
                <div className="entry-header">Price = 0.001 ETH</div>
                <h5>Status: <span className="balance-color">{props.status}</span></h5>
                <br /><br />
                <div className="entry-button-container">
                    <button className="submit-button" onClick={clickBuyBtn}>Buy using ETH</button>
                    <br /><br />
                    <button className="submit-button" onClick={clickSellBtn}>Sell for ETH</button>
                </div>
                <br />
            </form>
            <br />
        </div>
    )
}

export default BuynSell
