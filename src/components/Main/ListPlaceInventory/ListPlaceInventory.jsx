import React, {Component} from 'react'
import './ListPlaceInventory.css'
import {connect} from "react-redux";
import {editInventoryItem, removeInventoryItem} from "../../../redux/actions/inventory";

class ListPlaceInventory extends Component {

    removeInventoryHandler(name, id) {
        if (!window.confirm(`Вы хотите удалить ${name}`)) return

        this.props.removeInventoryItem(id)
    }

    editInventoryHandler(id) {
        this.props.editInventoryItem(id, this.props.idCurrentPlace)
    }

    render() {
        return (
            <ul className="list-main">
                {this.props.contentIteration.map(item => {
                    return (
                        <li className="list-main__item" key={item.id}>
                            <p className="list-main__paragraph">{item.data.name} - {item.data.count} - шт.</p>

                            <div className="list-main__wrapper">
                                <p  className="list-main__paragraph list-main__paragraph--remove"
                                    onClick={() => this.removeInventoryHandler(item.data.name, item.id)}>Удалить</p>

                                <span className="list-main__separator">/</span>

                                <p  className="list-main__paragraph list-main__paragraph--edit"
                                    onClick={() => this.editInventoryHandler(item.id)}>Редактировать</p>
                            </div>
                        </li>

                    )
                })}
            </ul>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        removeInventoryItem: id => dispatch(removeInventoryItem(id)),
        editInventoryItem: (id, idCurrentPlace) => dispatch(editInventoryItem(id, idCurrentPlace))
    }
}

const mapStateToProps = state => {
    return {
        idCurrentPlace: state.places.currentPlace.id
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPlaceInventory)