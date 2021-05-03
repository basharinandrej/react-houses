import {
    ADD_INVENTORY_ITEM,
    ALL_PLACE_ID_WITH_HAS_INVENTORY,
    ERROR_FETCH_INVENTORY, REMOVE_INVENTORY_ITEM,
    SET_CURRENT_INVENTORY, SET_INVENTORY_PLACE_CHILDREN,
    START_FETCH_INVENTORY,
    SUCCESS_FETCH_INVENTORY, UPDATE_INVENTORY_ITEM
} from "../actions/actionType";
import {
    findInventoryCurrentPlace,
    findInventoryPlaceChildren,
    removeInventoryItem,
    addInventoryItem,
    updateInventoryItem
} from "../helpers/inventory";
import {findAllPlaceIdWithHasInventory} from "../helpers/places";


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
                    action.placesItems
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
        case REMOVE_INVENTORY_ITEM:
            return {
                ...state,
                inventoryItems: removeInventoryItem([...state.inventoryItems], action.id),
                currentInventory: removeInventoryItem([...state.currentInventory], action.id),
                childrenInventory: removeInventoryItem([...state.childrenInventory], action.id),
            }
        case ADD_INVENTORY_ITEM:
            const place = state.inventoryItems[0]?.data.place
            const newInventory = addInventoryItem(place, action.placeId)

            return {
                ...state,
                inventoryItems: [...state.inventoryItems, newInventory],
                currentInventory: [...state.currentInventory, newInventory]
            }
        case UPDATE_INVENTORY_ITEM:
            const inventoryItems = [...state.inventoryItems]

            return {
                ...state,
                inventoryItems: updateInventoryItem(inventoryItems, action.id, action.idCurrentPlace),
            }
    }

    return state
}

export default inventory
