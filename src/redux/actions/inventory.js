import { FB } from "../../helpers/firebaseInit";
import {
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY,
    SET_CURRENT_INVENTORY,
    START_FETCH_INVENTORY,
    SUCCESS_FETCH_INVENTORY
} from "./actionType";


export const fetchInventory = () => {
    return async (dispatch, getState) => {
        try {
            //Получение информации об оборудовании
            const response = await FB.firestore().collection("inventory").get()

            let inventoryItems = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                placeId: x.data().place.id
            }));

            dispatch(successFetchInventory(inventoryItems))
            dispatch(setAllPlaceIdWithHasInventory(getState().allPlaceIdWithHasInventory))
        } catch (e) {
            dispatch(errorFetchInventory(e))
        }

    }
}

export const startFetchInventory = () => {
    return {
        type: START_FETCH_INVENTORY
    }
}

export const successFetchInventory = inventoryItems => {
    return {
        type: SUCCESS_FETCH_INVENTORY,
        inventoryItems
    }
}

export const errorFetchInventory = error => {
    return {
        type: ERROR_FETCH_INVENTORY,
        error
    }
}

export const setCurrentInventory = placeId => {

    return {
        type: SET_CURRENT_INVENTORY,
        placeId
    }
}

export const setAllPlaceIdWithHasInventory = allPlaceIdWithHasInventory => {
    return {
        type: ALL_PLACE_ID_WITH_HAS_INVENTORY,
        allPlaceIdWithHasInventory
    }
}
