import React, {Component} from 'react'
import {connect} from "react-redux";
import './PlaceChildren.css'
import ListPlaceChildrenInventory from "../ListPlaceChildrenInventory/ListPlaceChildrenInventory";


class PlaceChildren extends Component {

    render() {
        return (
            <>{
                this.props.childrenPlaceHasInventoryArray?.map(childrenPlace => {
                    if (childrenPlace.parts) return

                    return (
                        <div className="main__wrapper" key={childrenPlace.id}>
                            <h2 className="main__title title">{childrenPlace.data.name}</h2>

                            <ListPlaceChildrenInventory
                                childrenInventory={this.props.childrenInventory}
                                childrenPlaceId={childrenPlace.id}
                            />
                        </div>
                    )
                })
            }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        childrenPlaceHasInventoryArray: state.places.childrenPlaceHasInventoryArray,
        childrenInventory: state.inventory.childrenInventory
    }
}

export default connect(mapStateToProps)(PlaceChildren)