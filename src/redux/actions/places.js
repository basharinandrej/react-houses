import { FB } from "../../helpers/firebaseInit";
import {
    ERROR_FETCH_PLACES, SET_CHILDREN_PLACE_WITH_HAS_INVENTORY,
    SET_CURRENT_PLACE,
    START_FETCH_PLACES,
    SUCCESS_FETCH_PLACES
} from "./actionType";

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

export const setCurrentPlace = placeId => {
    return {
        type: SET_CURRENT_PLACE,
        placeId
    }
}

export const setPlaceChildrenHasInventory = allPlaceIdWithHasInventory => {
    return {
        type: SET_CHILDREN_PLACE_WITH_HAS_INVENTORY,
        allPlaceIdWithHasInventory
    }
}
