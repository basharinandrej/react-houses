import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";


class PlaceChildren extends Component {

    render() {

        return (
            <>{
                this.props.childrenPlaceHasInventoryArray?.map(childrenPlace => {
                    return (
                        <div className="main__wrapper" key={childrenPlace.id}>
                            <h2>{childrenPlace.data.name}</h2>

                            {this.props.childrenInventory.map(item => {
                                return (
                                    <p className="main__paragraph" key={item.id}>
                                        {item.data.name}
                                    </p>
                                )
                            })}
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