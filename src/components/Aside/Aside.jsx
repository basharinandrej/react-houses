import React, {Component} from 'react'
import { difference as getIdHouses } from 'lodash'
import { flattenDeep as flattenInCommonArray } from 'lodash'
import AsideList from "./AsideList/AsideList";
import './Aside.css'
import {connect} from "react-redux";
import {fetchPlaces, setPlaceChildrenHasInventory, setCurrentPlace} from "../../redux/actions/places";
import {fetchInventory, setCurrentInventory} from "../../redux/actions/inventory";


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
            this.props.setCurrentInventory(target.id)
            this.props.setPlaceChildrenHasInventory(this.props.allPlaceIdWithHasInventory)
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
                    inventory={this.props.inventory}
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
        inventory: state.inventory.inventoryItems,
        allPlaceIdWithHasInventory: state.inventory.allPlaceIdWithHasInventory,
        childrenPlaceHasInventory: state.places.childrenPlaceHasInventory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(fetchPlaces()),
        fetchInventory: () => dispatch(fetchInventory()),
        setCurrentPlace: placeId => dispatch(setCurrentPlace(placeId)),
        setCurrentInventory: placeId => dispatch(setCurrentInventory(placeId)),
        setPlaceChildrenHasInventory: allPlaceIdWithHasInventory => dispatch(setPlaceChildrenHasInventory(allPlaceIdWithHasInventory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
