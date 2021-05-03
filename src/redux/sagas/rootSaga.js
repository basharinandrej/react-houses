import {all} from 'redux-saga/effects'
import {
    addInventoryWatcher,
    allPlaceIdWithHasInventoryWatcher,
    removeInventoryWatcher,
    setPlaceChildrenHasInventoryWatcher, updateInventoryItemWatcher
} from "./sagas";


export default function* rootSaga() {
    yield all([
        allPlaceIdWithHasInventoryWatcher(),
        addInventoryWatcher(),
        removeInventoryWatcher(),
        setPlaceChildrenHasInventoryWatcher(),
        updateInventoryItemWatcher()
    ])
}