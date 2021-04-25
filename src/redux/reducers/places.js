import {
    ERROR_FETCH_PLACES, SET_CHILDREN_HAS_INVENTORY,
    SET_CURRENT_PLACE,
    START_FETCH_PLACES,
    SUCCESS_FETCH_PLACES
} from "../actions/actionType";

const initialState = {
    placesItems: [],
    childrenPlaceHasInventory: null,
    isLoading: true,
    currentPlace: null,
    error: null
}

const places = (state = initialState, action) => {

    switch (action.type) {
        case START_FETCH_PLACES:
            return {
                isLoading: true
            }
        case SUCCESS_FETCH_PLACES:
            return {
                ...state,
                isLoading: false,
                placesItems: action.placesItems
            }
        case ERROR_FETCH_PLACES:
            return {
                isLoading: false,
                error: action.error
            }
        case SET_CURRENT_PLACE:
            return {
                ...state,
                currentPlace: action.currentPlace
            }
        case SET_CHILDREN_HAS_INVENTORY:
            return {
                ...state,
                childrenPlaceHasInventory: action.childrenPlaceHasInventory
            }
    }

    return state
}

export default places
