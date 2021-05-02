import {ADD_INVENTORY_ITEM, REMOVE_INVENTORY_ITEM, SUCCESS_FETCH_INVENTORY} from "../actions/actionType";
import {takeEvery, put, select} from 'redux-saga/effects'
import {setAllPlaceIdWithHasInventory} from "../actions/inventory";

const getPlacesItems = state => [...state.places.placesItems]

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
    let project = yield select(getPlacesItems);
    yield put(setAllPlaceIdWithHasInventory(project))
}



