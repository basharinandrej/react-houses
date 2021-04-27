import React, {Component} from 'react'
import {connect} from "react-redux";
import PlaceChildren from "./PlaceChildren/PlaceChildren";
import './Main.css'

class Main extends Component {

    render() {
        return (
            <main className="main">
                <div className="container">
                    {!this.props.isLoading && (
                        <>
                            <h1>{this.props.name}</h1>

                            {this.props.currentInventory?.length
                                ? this.props.currentInventory.map( el => {
                                   return <div key={el.id}>
                                        <p>Оборудование: {el.data.name}</p>
                                        <p>Количество: {el.data.count}</p>
                                    </div>
                                })
                                :  this.props.childrenPlaceHasInventory?.length === 0
                                ? <p>Нет Оборудования</p> : null
                            }

                            <PlaceChildren/>
                        </>
                        )
                    }
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.placesItems,
        name: state.places.currentPlace?.data.name,
        isLoading: state.inventory.isLoading,
        currentInventory: state.inventory.currentInventory,
        childrenPlaceHasInventory: state.places.childrenPlaceHasInventory,
    }
}

export default connect(mapStateToProps)(Main)
