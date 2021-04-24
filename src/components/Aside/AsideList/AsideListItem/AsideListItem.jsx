import React from 'react'
import './AsideListItem.css'
import Indicator from "../../../../UI/Indicator/Indicator";

const AsideListItem = props => {
    const { place, renderLists, inventory, allPlacesId } = props

    const stateIndicator = allPlacesId.includes(place.id)
        && inventory.find(el => el.placeId === place.id ? el : 'Нет оборудования')

    return (
        <li className="aside-list__item">
            <p className="aside-list__paragraph"
                id={place.id}>
                {place.data.name}

                <Indicator
                    stateIndicator={stateIndicator}
                />
            </p>

            {place.parts ? renderLists(place.parts) : null}
        </li>
    )
}

export default AsideListItem
