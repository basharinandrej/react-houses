import {fetchAddInventoryItem, fetchRemoveInventoryItem, fetchUpdateInventoryItem} from "../services/inventory";

export const findInventoryCurrentPlace =  (inventoryItems, placeId) => {
    return inventoryItems.filter(el => el.placeId === placeId ? el.data : null)
}

export const findInventoryPlaceChildren = (inventoryItems, childrenPlaceHasInventoryArray) => {
    const idChildrenPlaceHasInventoryArray = []

    childrenPlaceHasInventoryArray.forEach(childrenPlace => {
        idChildrenPlaceHasInventoryArray.push(childrenPlace.id)
    })

    const childrenInventory = []

    idChildrenPlaceHasInventoryArray.forEach( idChildren => {
        inventoryItems.find(inventoryItem => {
            if (inventoryItem.placeId === idChildren) {
                childrenInventory.push(inventoryItem)
            }
        })
    })

    return childrenInventory
}

export const removeInventoryItem = (array, id) => {

    fetchRemoveInventoryItem(id)
    return array.filter(el => el.id !== id)
}

export const addInventoryItem = (place, placeId) => {
    const name = window.prompt('Введите название предмета')
    const count = window.prompt('Введите кол-во предметов', '1')

    const objInventory = {
        id: Math.random().toString(),
        placeId,
        data: {name, count, place}
    }

    fetchAddInventoryItem(objInventory)
    return objInventory
}

export const updateInventoryItem = (array, id, idCurrentPlace) => {
    const name = window.prompt('Введите новое название предмета')
    const count = window.prompt('Введите новое кол-во предметов', '2')


    array.map(el => {
        if (el.id === id) {
            el.data.name = name
            el.data.count = count
        } else {
           return el
        }
    })

    fetchUpdateInventoryItem(id, name, count, idCurrentPlace)

    return array
}
