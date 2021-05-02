import React, {Component} from 'react'
import {connect} from "react-redux";
import PlaceChildren from "./PlaceChildren/PlaceChildren";
import './Main.css'
import ListPlaceInventory from "./ListPlaceInventory/ListPlaceInventory";
import {addInventoryItem} from "../../redux/actions/inventory";
import {Button} from "../../UI/Button/Button";

class Main extends Component {

    hasNotChildrenPlace = () => !this.props.currentPlace?.parts?.length
    hasCurrentInventory = () => this.props.currentInventory?.length
    hasCurrentPlace = () => this.props.currentPlace

    render() {
        return (
            <main className="main">
                <div className="container">
                    {!this.props.isLoading && (
                        <>
                            <h1 className="main__title title">{this.props.currentPlace?.data.name}</h1>

                            {this.hasCurrentInventory()
                                ? <ListPlaceInventory
                                    contentIteration={this.props.currentInventory}
                                  />
                                :  this.props.childrenPlaceHasInventoryArray?.length === 0
                                ? <p className="main__paragraph">Нет Оборудования</p> : null
                            }


                            {this.hasNotChildrenPlace() && this.hasCurrentPlace() &&
                                <Button onClick={() => this.props.addInventoryItem(
                                    this.props.currentPlace?.id, this.props.places
                                )}>
                                    Добавить инвентарь
                                </Button>
                            }

                            <PlaceChildren />
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
        currentPlace: state.places.currentPlace,
        isLoading: state.inventory.isLoading,
        currentInventory: state.inventory.currentInventory,
        childrenPlaceHasInventoryArray: state.places.childrenPlaceHasInventoryArray,
        allPlaceIdWithHasInventory: state.inventory.allPlaceIdWithHasInventory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addInventoryItem: (placeId, placesItems) => dispatch(addInventoryItem(placeId, placesItems))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
