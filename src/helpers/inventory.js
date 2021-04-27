export const findCurrentInventory =  (inventoryItems, placeId) => {
    return inventoryItems.filter(el => el.placeId === placeId ? el.data : null)
}