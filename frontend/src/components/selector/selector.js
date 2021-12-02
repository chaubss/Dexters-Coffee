import React, { useState } from 'react'
import './selector.css'

function Selector(props) {
    const [selected, setSelected] = useState(0)
    const getSelectedClassName = (s) => {
        return "selector-item " + (s == selected ? "selected" : "")
    }
    const setSelectedPayment = () => {
        setSelected(0)
        props.setSelected(0)
    }
    const setSelectedExplorer = () => {
        setSelected(3)
        props.setSelected(3)
    }
    const setSelectedEntry = () => {
        setSelected(2)
        props.setSelected(2)
    }
    const setSelectedNode = () => {
        setSelected(1)
        props.setSelected(1)
    }

    return (
        <div className="selector-container">
            <div className={getSelectedClassName(0)} onClick={setSelectedPayment}>
                PAY
            </div>
            <div className={getSelectedClassName(1)} onClick={setSelectedNode}>
                PoS
            </div>
            <div className={getSelectedClassName(2)} onClick={setSelectedEntry}>
                ENTRY
            </div>
            <div className={getSelectedClassName(3)} onClick={setSelectedExplorer}>
                EXPLORE
            </div>
        </div>
    )
}

export default Selector
