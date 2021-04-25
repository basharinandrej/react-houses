import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";


class Children extends Component {

    render() {
        return (
            this.props.childrenPlaceHasInventory?.length ?
            this.props.childrenPlaceHasInventory.map(el => {
                return (
                    <Fragment key={el.id}>
                        <p>{el.data.name}</p>

                        {this.props.childrenInventory.map(item => {
                            return (
                                <p key={item.id}>
                                    {item.data.name}
                                </p>
                            )
                        })}
                    </Fragment>
                )
            }) : null
        )
    }
}

const mapStateToProps = state => {
    return {
        childrenPlaceHasInventory: state.places.childrenPlaceHasInventory,
        childrenInventory: state.inventory.childrenInventory
    }
}

export default connect(mapStateToProps)(Children)