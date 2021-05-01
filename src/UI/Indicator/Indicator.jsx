import React from 'react'
import './Indicator.css'

export const Indicator = props => {
    const {stateIndicator} = props
    const cls = ['indicator']

    if (typeof stateIndicator === "object") {
        cls.push('indicator--success')
    }

    return (
        <span className={`${cls.join(' ')}`} />
    )
}


