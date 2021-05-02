import firebase from "firebase";

export const fetchRemoveInventoryItem = id => {
    firebase.firestore().collection("inventory").doc(id).delete().then(() => {
        console.info("Success Delete Inventory Item");
    });
}

export const fetchAddInventoryItem = ({placeId, data: {name, count} }) => {
    let fileStore = firebase.firestore();

    fileStore.collection("inventory").doc().set({
        name,
        count,
        place: fileStore.collection("places").doc(placeId)
    }).then(() => {
        console.info("Success Add Inventory Item");
    });
}