import { FB } from "../../helpers/firebaseInit";
import {
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY,
    SET_CURRENT_INVENTORY,
    SET_INVENTORY_PLACE_CHILDREN,
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

export const setInventoryCurrentPlace = placeId => {

    return {
        type: SET_CURRENT_INVENTORY,
        placeId
    }
}

export const getInventoryPlaceChildren = () => (dispatch, getState) => {
    const inventoryItems = getState().inventory.inventoryItems
    const childrenPlaceHasInventoryArray = getState().places.childrenPlaceHasInventoryArray

    dispatch(setInventoryPlaceChildren(inventoryItems, childrenPlaceHasInventoryArray))
}

export const setInventoryPlaceChildren = (inventoryItems, childrenPlaceHasInventoryArray) => {
    return {
        type: SET_INVENTORY_PLACE_CHILDREN,
        inventoryItems,
        childrenPlaceHasInventoryArray
    }
}

export const setAllPlaceIdWithHasInventory = allPlaceIdWithHasInventory => {
    return {
        type: ALL_PLACE_ID_WITH_HAS_INVENTORY,
        allPlaceIdWithHasInventory
    }
}
