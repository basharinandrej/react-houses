import {all} from 'redux-saga/effects'
import {addInventoryWatcher, allPlaceIdWithHasInventoryWatcher, removeInventoryWatcher} from "./sagas";


export default function* rootSaga() {
    yield all([
        allPlaceIdWithHasInventoryWatcher(),
        addInventoryWatcher(),
        removeInventoryWatcher()
    ])
}