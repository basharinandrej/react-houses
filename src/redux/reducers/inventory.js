import {
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY,
    SET_CURRENT_INVENTORY, SET_INVENTORY_CHILDREN,
    START_FETCH_INVENTORY,
    SUCCESS_FETCH_INVENTORY
} from "../actions/actionType";

const initialState = {
    inventoryItems: [],
    currentInventory: null,
    childrenInventory: null,
    allPlaceIdWithHasInventory: null,
    isLoading: true,
    error: null
}

const inventory = (state = initialState, action) => {

    switch (action.type) {
        case START_FETCH_INVENTORY:
            return {
                ...state,
                isLoading: true
            }
        case SUCCESS_FETCH_INVENTORY:
            return {
                ...state,
                isLoading: false,
                inventoryItems: action.inventoryItems
            }
        case ERROR_FETCH_INVENTORY:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case SET_CURRENT_INVENTORY:
            return {
                ...state,
                currentInventory: action.currentInventory
            }
        case SET_INVENTORY_CHILDREN:
            return {
                ...state,
                childrenInventory: action.childrenInventory
            }
        case ALL_PLACE_ID_WITH_HAS_INVENTORY:
            return {
                ...state,
                allPlaceIdWithHasInventory: action.allPlaceIdWithHasInventory
            }
    }

    return state
}

export default inventory
