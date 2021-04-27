import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";


class PlaceChildren extends Component {

    render() {

        return (
            <>{
                this.props.childrenPlaceHasInventory?.map(el => {
                    return (
                        <div className="main__wrapper" key={el.id}>
                            <h2>{el.data.name}</h2>

                            {/*{this.props.childrenInventory.map(item => {*/}
                            {/*    return (*/}
                            {/*        <p className="main__paragraph" key={item.id}>*/}
                            {/*            {item.data.name}*/}
                            {/*        </p>*/}
                            {/*    )*/}
                            {/*})}*/}
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
        childrenPlaceHasInventory: state.places.childrenPlaceHasInventory,
        childrenInventory: state.inventory.childrenInventory
    }
}

export default connect(mapStateToProps)(PlaceChildren)