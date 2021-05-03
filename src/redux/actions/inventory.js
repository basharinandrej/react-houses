import { FB } from "../../helpers/firebaseInit";
import {
    ADD_INVENTORY_ITEM,
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY, REMOVE_INVENTORY_ITEM,
    SET_CURRENT_INVENTORY,
    SET_INVENTORY_PLACE_CHILDREN,
    START_FETCH_INVENTORY,
    SUCCESS_FETCH_INVENTORY, UPDATE_INVENTORY_ITEM
} from "./actionType";


export const fetchInventory = () => {
    return async dispatch => {
        try {
            const response = await FB.firestore().collection("inventory").get()

            let inventoryItems = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                placeId: x.data().place?.id
            }));

            console.log('inventoryItems', inventoryItems);
            dispatch(successFetchInventory(inventoryItems))
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

export const setInventoryPlaceChildren = (inventoryItems, childrenPlaceHasInventoryArray) => {
    return {
        type: SET_INVENTORY_PLACE_CHILDREN,
        inventoryItems,
        childrenPlaceHasInventoryArray
    }
}

export const setAllPlaceIdWithHasInventory = placesItems => {
    return {
        type: ALL_PLACE_ID_WITH_HAS_INVENTORY,
        placesItems
    }
}

export const removeInventoryItem = id => {
    return {
        type: REMOVE_INVENTORY_ITEM,
        id
    }
}

export const addInventoryItem = (placeId, placesItems) => {
    return {
        type: ADD_INVENTORY_ITEM,
        placeId,
        placesItems
    }
}

export const editInventoryItem = (id, idCurrentPlace) => {
    return {
        type: UPDATE_INVENTORY_ITEM,
        id,
        idCurrentPlace
    }
}
