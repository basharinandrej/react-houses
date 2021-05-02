import React, {Component} from 'react'
import AsideListItem from "./AsideListItem/AsideListItem";
import {connect} from "react-redux";


class AsideList extends Component {


    render() {
        return (
            <ul className="aside-list"
                onClick={e => this.props.onClickPlaceHandler.call(this.props.context, e)}
            >
                {this.props.places.map( place  => {
                    if ( this.props.housesId.includes(place.id) ) {
                        return (
                            <AsideListItem
                                key={place.id}
                                place={place}
                                renderLists={this.props.renderLists}
                                placesItems={this.props.places}
                                allPlaceIdWithHasInventory={this.props.allPlaceIdWithHasInventory}
                            />
                        )
                    }
                })}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        allPlaceIdWithHasInventory: state.inventory.allPlaceIdWithHasInventory
    }
}


export default connect(mapStateToProps)(AsideList)

