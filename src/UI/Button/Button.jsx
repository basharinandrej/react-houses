import React from 'react'
import './Button.css'

export const Button = props => {
    const {children, onClick} = props

    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    )
}