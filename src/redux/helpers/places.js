import {flattenDeep as flattenPartsIdPlaceChildrenInCommonArray} from 'lodash'
import {intersection as getIdPlaceChildrenHasInventory} from 'lodash'
import {uniq as uniq} from 'lodash'

export const findCurrentPlace = (placesItems, placeId) => placesItems.find(el => el.id === placeId)

export const findAllPlaceIdWithHasInventory = (inventoryItems, placesItems) => {
    const allPlaceIdWithHasInventory = inventoryItems?.map(el => el.placeId)

    const findDeepRecursionPlaceId = (placeId, placesItems) => {
        placesItems?.find(place => {
            if (place.parts?.includes( placeId )) {
                allPlaceIdWithHasInventory.push(place.id)

                findDeepRecursionPlaceId(place.id, placesItems)
            }
        })
    }

    allPlaceIdWithHasInventory.map(placeId => {
        return findDeepRecursionPlaceId(placeId, placesItems)
    })

    return uniq(allPlaceIdWithHasInventory)
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
    const idPlaceChildrenHasInventory = getIdPlaceChildrenHasInventory( allPlaceIdWithHasInventory, partsIdAtPlaceChildren)


    const childrenPlaceHasInventoryArray = []

    for( let i = 0; i < idPlaceChildrenHasInventory.length; i++) {
        placesItems.find(el => {
            if (el.id === idPlaceChildrenHasInventory[i] ) {
                childrenPlaceHasInventoryArray.push(el)
            }
        })
    }

    return childrenPlaceHasInventoryArray
}
