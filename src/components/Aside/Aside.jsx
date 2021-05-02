import React, {Component} from 'react'
import { difference as getIdHouses } from 'lodash'
import { flattenDeep as flattenInCommonArray } from 'lodash'
import AsideList from "./AsideList/AsideList";
import './Aside.css'
import {connect} from "react-redux";
import {fetchPlaces, dispatchChildrenPlaceAndInventory, setCurrentPlace} from "../../redux/actions/places";
import {fetchInventory, setInventoryCurrentPlace} from "../../redux/actions/inventory";


class Aside extends Component {

    componentDidMount() {
        this.props.fetchPlaces()
        this.props.fetchInventory()
    }

    onClickPlaceHandler(event) {
        event.stopPropagation()
        const target = event.target

        if (target.id !== '') {
            this.props.setCurrentPlace(target.id)
            this.props.setInventoryCurrentPlace(target.id)
            this.props.dispatchChildrenPlaceAndInventory(this.props.allPlaceIdWithHasInventory)
        }
    }

    getIdParts() {
        const places = this.props.places.filter(place => place.parts)
        const parts = places.map(part => part.parts)

        return flattenInCommonArray(parts)
    }

    renderListHouses() {
        const allPlacesId = this.props.places.map(place => place.id);
        const allPartsId = this.getIdParts();
        const housesId = getIdHouses(allPlacesId, allPartsId)

        const renderLists = array => {
            return (
                <AsideList
                    places={this.props.places}
                    housesId={array}
                    renderLists={renderLists}
                    onClickPlaceHandler={this.onClickPlaceHandler}
                    context={this}
                />
            )
        }

        return renderLists(housesId)
    }

    render() {
        return (
            <aside className="main-aside">
                { !this.props.isLoading && this.renderListHouses() }
            </aside>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.placesItems,
        isLoading: state.places.isLoading,
        allPlaceIdWithHasInventory: state.inventory.allPlaceIdWithHasInventory,
        childrenPlaceHasInventoryArray: state.places.childrenPlaceHasInventoryArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(fetchPlaces()),
        fetchInventory: () => dispatch(fetchInventory()),
        setCurrentPlace: placeId => dispatch(setCurrentPlace(placeId)),
        setInventoryCurrentPlace: placeId => dispatch(setInventoryCurrentPlace(placeId)),
        dispatchChildrenPlaceAndInventory: allPlaceIdWithHasInventory => dispatch(dispatchChildrenPlaceAndInventory(allPlaceIdWithHasInventory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
