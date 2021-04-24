import React, {Component} from 'react'
import { FB } from "../../helpers/firebaseInit";
import { difference as getIdHouses } from 'lodash'
import AsideList from "./AsideList/AsideList";
import './Aside.css'

class Aside extends Component {

    state = {
        places: [],
        inventory: [],
        isLoading: true
    }

    componentDidMount() {
        // Получение информации о зданиях и комнатах
        FB.firestore().collection("places").get().then(response => {
            let places = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                parts: x.data().parts && x.data().parts.map(part => part.id)
            }));

            this.setState({
                places
            })
        });


        //Получение информации об оборудовании
        FB.firestore().collection("inventory").get().then(response => {
            let inventory = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                placeId: x.data().place.id
            }));

            this.setState({
                inventory,
                isLoading: false
            })
        });
    }

    renderListHouses() {
        const allPlacesId = this.state.places.map(place => place.id)
        const allPartsId = []

        this.state.places.map(place => {
            if (place.parts?.length) {
                place.parts.forEach(part => allPartsId.push(part))
            }
        })

        const housesId = getIdHouses(allPlacesId, allPartsId)

        const renderLists = array => {
            return (
                <AsideList
                    housesId={array}
                    renderLists={renderLists}
                    places={this.state.places}
                    inventory={this.state.inventory}
                />
            )
        }

        return renderLists(housesId)
    }

    render() {
        return (
            <aside className="main-aside">
                { !this.state.isLoading && this.renderListHouses() }
            </aside>
        )
    }
}

export default Aside
