import places from "./places";
import inventory from "./inventory";

const {combineReducers} = require("redux");


export default combineReducers({
    places,
    inventory
})

