import {
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY,
    SET_CURRENT_INVENTORY, SET_INVENTORY_PLACE_CHILDREN,
    START_FETCH_INVENTORY,
    SUCCESS_FETCH_INVENTORY
} from "../actions/actionType";
import {findInventoryCurrentPlace, findInventoryPlaceChildren} from "../../helpers/inventory";
import {findAllPlaceIdWithHasInventory} from "../../helpers/places";


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
                currentInventory: findInventoryCurrentPlace(
                    [...state.inventoryItems],
                    action.placeId
                )
            }
        case ALL_PLACE_ID_WITH_HAS_INVENTORY:
            return {
                ...state,
                allPlaceIdWithHasInventory: findAllPlaceIdWithHasInventory(
                    [...state.inventoryItems],
                    action.allPlaceIdWithHasInventory
                )
            }
        case SET_INVENTORY_PLACE_CHILDREN:
            return {
                ...state,
                childrenInventory: findInventoryPlaceChildren(
                    action.inventoryItems,
                    action.childrenPlaceHasInventoryArray
                )
            }
    }

    return state
}

export default inventory
