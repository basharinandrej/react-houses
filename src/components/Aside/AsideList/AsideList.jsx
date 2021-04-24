import React from 'react'
import AsideListItem from "./AsideListItem/AsideListItem";

const AsideList = props => {
    const { housesId, renderLists, places, inventory } = props

    const allPlacesId = []
    inventory.forEach(el => allPlacesId.push(el.placeId))

    return (
        <ul className="aside-list">
            {places.map( place  => {
                if ( housesId.includes(place.id) ) {
                    return (
                        <AsideListItem
                            key={place.id}
                            place={place}
                            renderLists={renderLists}
                            inventory={inventory}
                            allPlacesId={allPlacesId}
                        />
                    )
                }
            })}
        </ul>
    )
}

export default AsideList
