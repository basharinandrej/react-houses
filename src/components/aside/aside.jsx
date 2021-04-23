import React, {Component} from 'react'
import { FB } from "../../helpers/firebaseInit";
import {findDuplicateElements} from "../../helpers/findDuplicateElements";

class Aside extends Component {

    state = {
        housesInfo: []
    }

    componentDidMount() {
        // Получение информации о зданиях и комнатах
        FB.firestore().collection("places").get().then(response => {
            let housesInfo = response.docs.map(x => ({
                id: x.id,
                data: x.data(),
                parts: x.data().parts && x.data().parts.map(part => part.id)
            }));

            this.setState({
                housesInfo
            })
        });
    }

    renderListHouses() {
        const allId = this.state.housesInfo.map(el => el.id)
        const partId = []

        this.state.housesInfo.map(el => {
            if (el.parts?.length) {
                el.parts.forEach(part => partId.push(part))
            }
        })

        console.log('arrayCompare', findDuplicateElements(allId.concat(partId)));
    }
    render() {
        return (
            <aside>
                {this.renderListHouses()}
            </aside>
        )
    }
}

export default Aside
