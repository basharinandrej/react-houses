import { FB } from "../../helpers/firebaseInit";
import {
    ERROR_FETCH_PLACES, SET_CHILDREN_HAS_INVENTORY,
    SET_CURRENT_PLACE,
    START_FETCH_PLACES,
    SUCCESS_FETCH_PLACES
} from "./actionType";
import {findChildrenInventory, findCurrentInventory} from "./inventory";
import _ from 'lodash'

export const fetchPlaces = () => {
    return async dispatch => {
        dispatch(startFetchPlaces())

        try {
            // Получение информации о зданиях и комнатах
            const response = await FB.firestore().collection("places").get()

            let places = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                parts: x.data().parts && x.data().parts.map(part => part.id)
            }));

            dispatch(successFetchPlaces(places))
        } catch (e) {
            dispatch(errorFetchPlaces(e))
        }

    }
}

export const startFetchPlaces = () => {
    return {
        type: START_FETCH_PLACES
    }
}

export const successFetchPlaces = placesItems => {
    return {
        type: SUCCESS_FETCH_PLACES,
        placesItems
    }
}

export const errorFetchPlaces = error => {
    return {
        type: ERROR_FETCH_PLACES,
        error
    }
}

export const findCurrentPlace = placeId => {
    return ( dispatch, setState ) => {
        const placesItems = setState().places.placesItems
        const currentPlace = placesItems.find(el => el.id === placeId)

        dispatch(setCurrentPlace(currentPlace))
        dispatch(findCurrentInventory(placeId))
        dispatch(findChildrenHasInventory())
    }
}

export const setCurrentPlace = currentPlace => {

    return {
        type: SET_CURRENT_PLACE,
        currentPlace
    }
}

export const findChildrenHasInventory = () => {
    //TODO Сделать Рефакторинг
    return (dispatch, setState) => {
        const currentPlace = setState().places.currentPlace
        const placesItems = setState().places.placesItems
        const allPlaceIdWithHasInventory = setState().inventory.allPlaceIdWithHasInventory

        const parts = []

        currentPlace.parts?.forEach(el => {
            parts.push(el)

            placesItems.forEach(place => {
                if ( place.id === el && place.parts) {
                    parts.push( place.parts )
                }
            })
        })

        const childrenIdHasInventory = _.intersection( allPlaceIdWithHasInventory, _.flattenDeep(parts))

        const childrenPlaceHasInventory = []

        for( let i = 0; i < childrenIdHasInventory.length; i++) {
            placesItems.find(el => {
                if (el.id === childrenIdHasInventory[i] ) {
                    childrenPlaceHasInventory.push(el)
                }
            })
        }

        childrenPlaceHasInventory.forEach(el => {
            dispatch(findChildrenInventory(el.id))
        })
        dispatch(setChildrenHasInventory(childrenPlaceHasInventory))
    }
}

export const setChildrenHasInventory = childrenPlaceHasInventory => {
    return {
        type: SET_CHILDREN_HAS_INVENTORY,
        childrenPlaceHasInventory
    }
}

