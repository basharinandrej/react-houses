import React, {Component} from 'react'
import './ListPlaceChildrenInventory.css'
import {connect} from "react-redux";
import {removeInventoryItem} from "../../../redux/actions/inventory";

class ListPlaceChildrenInventory extends Component {


    render() {
        return (
            <ul className="list-main">
                {this.props.childrenInventory.map(inventory => {
                    // if (this.props.childrenPlaceId === inventory.placeId) {
                        return (
                            <li className="list-main__item" key={inventory.id}>
                                <p className="list-main__paragraph">{inventory.data.name} - {inventory.data.count} - шт.</p>
                            </li>
                        )
                    })}
            </ul>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeInventoryItem: id => dispatch(removeInventoryItem(id))
    }
}

export default connect(null, mapDispatchToProps)(ListPlaceChildrenInventory)
