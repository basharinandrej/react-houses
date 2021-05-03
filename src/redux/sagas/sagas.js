import {
    ADD_INVENTORY_ITEM,
    REMOVE_INVENTORY_ITEM,
    SET_CHILDREN_PLACE_WITH_HAS_INVENTORY,
    SUCCESS_FETCH_INVENTORY, UPDATE_INVENTORY_ITEM
} from "../actions/actionType";
import {takeEvery, put, select} from 'redux-saga/effects'
import {setAllPlaceIdWithHasInventory, setInventoryCurrentPlace, setInventoryPlaceChildren} from "../actions/inventory";

const getPlacesItems = state => [...state.places.placesItems]
const getInventoryItems = state => [...state.inventory.inventoryItems]
const getChildrenPlaceHasInventoryArray = state => [...state.places.childrenPlaceHasInventoryArray]
const getCurrentPlace = state => [...state.places.currentPlace.id]

export function* allPlaceIdWithHasInventoryWatcher() {
    yield takeEvery(SUCCESS_FETCH_INVENTORY, allPlaceIdWithHasInventoryWorker)
}

export function* addInventoryWatcher() {
    yield takeEvery(ADD_INVENTORY_ITEM, allPlaceIdWithHasInventoryWorker)
}

export function* removeInventoryWatcher() {
    yield takeEvery(REMOVE_INVENTORY_ITEM, allPlaceIdWithHasInventoryWorker)
}

function* allPlaceIdWithHasInventoryWorker() {
    const places = yield select(getPlacesItems);
    yield put(setAllPlaceIdWithHasInventory(places))
}



export function* setPlaceChildrenHasInventoryWatcher() {
    yield takeEvery(SET_CHILDREN_PLACE_WITH_HAS_INVENTORY, setPlaceChildrenHasInventoryWorker)
}

function* setPlaceChildrenHasInventoryWorker() {
    const inventoryItems = yield select(getInventoryItems)
    const childrenPlaceHasInventoryArray = yield select(getChildrenPlaceHasInventoryArray)

    yield put(setInventoryPlaceChildren(inventoryItems, childrenPlaceHasInventoryArray))
}



export function* updateInventoryItemWatcher() {
    yield takeEvery(UPDATE_INVENTORY_ITEM, updateInventoryItemWorker)
}

function* updateInventoryItemWorker() {
    const placeId = yield select(getCurrentPlace)
    yield put(setInventoryCurrentPlace(placeId.join('')))
}
