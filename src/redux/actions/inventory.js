import { FB } from "../../helpers/firebaseInit";
import {
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY,
    SET_CURRENT_INVENTORY,
    SET_INVENTORY_CHILDREN,
    START_FETCH_INVENTORY,
    SUCCESS_FETCH_INVENTORY
} from "./actionType";


export const fetchInventory = () => {
    return async dispatch => {
        try {
            //Получение информации об оборудовании
            const response = await FB.firestore().collection("inventory").get()

            let inventoryItems = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                placeId: x.data().place.id
            }));

            dispatch(successFetchInventory(inventoryItems))
            dispatch(findAllPlaceIdWithHasInventory())
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

export const findCurrentInventory = placeId => (dispatch, getState) => {
    const inventoryItems = getState().inventory.inventoryItems
    const currentInventory = inventoryItems.filter(el => el.placeId === placeId ? el.data : null)

    dispatch(setCurrentInventory(currentInventory))
}

export const setCurrentInventory = currentInventory => {

    return {
        type: SET_CURRENT_INVENTORY,
        currentInventory: currentInventory || null
    }
}

export const findChildrenInventory = placeId => (dispatch, getState) => {
    const inventoryItems = getState().inventory.inventoryItems
    const childrenInventory = inventoryItems.filter(el => el.placeId === placeId ? el.data : null)

    dispatch(setChildrenInventory(childrenInventory))
}

export const setChildrenInventory = childrenInventory => {
    return {
        type: SET_INVENTORY_CHILDREN,
        childrenInventory
    }
}

export const findAllPlaceIdWithHasInventory = () => (dispatch, setState) => {
    const inventory = setState().inventory.inventoryItems
    const getAllPlaceIdWithHasInventory = () => inventory.map(el => el.placeId)

    dispatch(setAllPlaceIdWithHasInventory(getAllPlaceIdWithHasInventory()))
}

export const setAllPlaceIdWithHasInventory = allPlaceIdWithHasInventory => {
    return {
        type: ALL_PLACE_ID_WITH_HAS_INVENTORY,
        allPlaceIdWithHasInventory
    }
}
