import { React, useState, useEffect } from 'react'
import './entry.css'
import BuynSell from './buynsell'
import Web3 from 'web3'
import { retContractAbi, retSaleContractAbi, tokenContractAddress, saleContractAddress } from './Web3Client'

function Entry() {
    const [amountET, setAmountET] = useState(1)
    const [connectedAccount, setConnectedAccount] = useState(null)
    const [retContract, setRetContract] = useState(null)
    const [retSaleContract, setRetSaleContract] = useState(null)
    const [balance, setBalance] = useState(0)
    const [status, setStatus] = useState('Idle')
    const [statusBuySell, setStatusBuySell] = useState('Idle')
    useEffect(() => {
        initWeb3()
    }, [])

    useEffect(() => {
        if (connectedAccount == null) {
            setBalance(0)
        }
        if (connectedAccount != null && retContract != null && retSaleContract != null) {
            getRetBalance()
        }
    }, [connectedAccount, retSaleContract, retContract])

    const initWeb3 = async () => {
        try {
            let provider = window.ethereum
            if (typeof provider === 'undefined') {
                alert('Please install the MetaMask extension to buy and sell RET using ETH.')
                return
            }
            const accounts = await provider.request({ method: 'eth_requestAccounts' })
            setConnectedAccount(accounts[0])
            provider.on('accountsChanged', (accounts) => {
                setConnectedAccount(accounts[0])
            })

            const web3 = new Web3(provider)
            setRetContract(new web3.eth.Contract(
                retContractAbi,
                tokenContractAddress
            ))
            setRetSaleContract(new web3.eth.Contract(
                retSaleContractAbi,
                saleContractAddress
            ))

        } catch (error) {
            console.log(error)
        }
    }

    const buyUsingETH = async (amount) => {
        console.log('buy using ETH')
        // const tx = await retContract.methods.buy(amt).send({ from: connectedAccount })
        // const tx = await retSaleContract.methods.buyTokens(Web3.utils.toWei(Web3.utils.toBN(amount))).send({ from: connectedAccount, value: "1000000000000000" })
        const val = 1000000000000000 * amount
        setStatusBuySell('Waiting for Transaction...')
        const tx = await retSaleContract.methods.buyTokens(amount.toString()).send({ from: connectedAccount, value: val })
        setStatusBuySell('Transaction Completed!')
        console.log(tx)
        getRetBalance()
    }

    const sellForETH = async (amount) => {
        console.log('sell for ETH')
        // const tx = await retContract.methods.buy(amt).send({ from: connectedAccount })
        // const tx = await retSaleContract.methods.buyTokens(Web3.utils.toWei(Web3.utils.toBN(amount))).send({ from: connectedAccount, value: "1000000000000000" })
        // authorize first
        setStatusBuySell('Waiting for approval...')
        const txApproval = await retContract.methods.approve(saleContractAddress, amount).send({ from: connectedAccount })
        const val = 1000000000000000 * amount
        setStatusBuySell('Waiting for Transaction...')
        const tx = await retSaleContract.methods.sellTokens(amount).send({ from: connectedAccount })
        setStatusBuySell('Transaction Completed!')
        console.log(tx)
        getRetBalance()
    }

    const entryFn = (e) => {
        e.preventDefault()
        enterShop()
    }

    const enterShop = async () => {
        console.log('Entering the coffee shop...')
        // approve transaction first
        setStatus('Waiting for approval...')
        const txApproval = await retContract.methods.approve(saleContractAddress, amountET).send({ from: connectedAccount })
        console.log(txApproval)
        setStatus('Performing transaction...')
        const tx = await retSaleContract.methods.customerEntry(amountET).send({ from: connectedAccount })
        setStatus('Transaction Complete!')
        console.log(tx)
        getRetBalance()
    }

    const getRetBalance = () => {
        retContract.methods.balanceOf(connectedAccount).call()
            .then(balance => {
                console.log('Printing the balance:', balance)
                setBalance(balance)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const updateAmount = (e) => {
        setAmountET(e.target.name == "amountet" ? e.target.value : amountET)
    }
    return (
        <div className="entry-container">
            <div className="entry-left-container">
                <h1>Dexter's Coffee Entry</h1>
                <h3>Powered by Ethereum</h3>
                <h4 className="entry-caption">Use Royal Entry Tokens (RET) to enter Dexter's Coffee.</h4>
                <h3>Your balance: <span className="balance-color">{balance + " RET"}</span></h3>
                <h5>Connected Account: <span className="balance-color">{connectedAccount || "No account connected"}</span></h5>
                <h5>Status: <span className="balance-color">{status}</span></h5>
                <br />
                <form onSubmit={entryFn}>
                    <div className="entry-header">AMOUNT OF ENTRY TOKENS</div>
                    <div className="entry-input-container">
                        <input width="pixels" className="entry-input" value={amountET} onChange={updateAmount} name="amountet"></input>
                    </div>
                    <div className="entry-header">Minimum: 1 RET</div>
                    <br /><br />
                    <div className="entry-button-container">
                        <button className="submit-button" type="submit">Enter</button>
                    </div>
                    <br />
                </form>
            </div>
            <div className="entry-right-container">
                <BuynSell buyFunction={buyUsingETH} sellFunction={sellForETH} status={statusBuySell} />
            </div>
        </div >
    )
}

export default Entry