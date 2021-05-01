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