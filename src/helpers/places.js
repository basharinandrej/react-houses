import {flattenDeep as flattenPartsIdPlaceChildrenInCommonArray} from 'lodash'
import {intersection as getPlaceChildrenIdHasInventory} from 'lodash'

export const findCurrentPlace = (placesItems, placeId) => {
    return placesItems.find(el => el.id === placeId)
}

export const findAllPlaceIdWithHasInventory = inventoryItems => {
    return inventoryItems.map(el => el.placeId)
}

export const findPlaceChildrenWithHasInventory = (state, allPlaceIdWithHasInventory) => {
    const currentPlace = state.currentPlace
    const placesItems = state.placesItems

    let partsIdAtPlaceChildren = []

    currentPlace.parts?.forEach(part => {
        partsIdAtPlaceChildren.push(part)

        placesItems.forEach(place => {
            if ( place.id === part && place.parts) {
                partsIdAtPlaceChildren.push( place.parts )
            }
        })
    })

    partsIdAtPlaceChildren = flattenPartsIdPlaceChildrenInCommonArray(partsIdAtPlaceChildren)
    const placeChildrenIdHasInventory = getPlaceChildrenIdHasInventory( allPlaceIdWithHasInventory, partsIdAtPlaceChildren)


    const childrenPlaceHasInventory = []

    for( let i = 0; i < placeChildrenIdHasInventory.length; i++) {
        placesItems.find(el => {
            if (el.id === placeChildrenIdHasInventory[i] ) {
                childrenPlaceHasInventory.push(el)
            }
        })
    }

    return childrenPlaceHasInventory
}
