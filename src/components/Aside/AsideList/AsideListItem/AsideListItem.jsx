import React from 'react'
import './AsideListItem.css'
import {Indicator as IndicatorHasInventory} from "../../../../UI/Indicator/Indicator";


const AsideListItem = props => {
    const { place, renderLists, placesItems, allPlaceIdWithHasInventory } = props

    const stateIndicator = allPlaceIdWithHasInventory?.includes(place.id)
        && placesItems.find(el => el.id === place.id ? el : null)

    return (
        <li className="aside-list__item">
            <p className="aside-list__paragraph"
                id={ place.id }>
                { place.data?.name }

                <IndicatorHasInventory
                    stateIndicator={stateIndicator}
                />
            </p>

            {place.parts ? renderLists(place.parts) : null}
        </li>
    )
}

export default AsideListItem
