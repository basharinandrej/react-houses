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

export const fetchUpdateInventoryItem = (id, name, count, placeId) => {
    let fileStore = firebase.firestore();

    firebase.firestore().collection("inventory").doc(id).set({
        name,
        count,
        place: fileStore.collection("places").doc(placeId)
    }).then(() => {
        console.info("Success Update Inventory Item");
    });
}