import React, {Component} from 'react'
import './ListPlaceInventory.css'
import {connect} from "react-redux";
import {removeInventoryItem} from "../../../redux/actions/inventory";

class ListPlaceInventory extends Component {

    removeInventoryHandler(name, id) {
        if (!window.confirm(`Вы хотите удалить ${name}`)) return

        this.props.removeInventoryItem(id)
    }

    render() {
        return (
            <ul className="list-main">
                {this.props.contentIteration.map(item => {
                    return (
                        <li className="list-main__item" key={item.id}>
                            <p className="list-main__paragraph">{item.data.name} - {item.data.count} - шт.</p>

                            <p  className="list-main__paragraph--remove"
                                onClick={() => this.removeInventoryHandler(item.data.name, item.id)}>Удалить</p>
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

export default connect(null, mapDispatchToProps)(ListPlaceInventory)