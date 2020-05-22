import firebase from 'firebase/app'
import 'firebase/firestore'

const config={
    apiKey: "AIzaSyA--H5yBBiCjtDN9aZ5bLEiYUbuXpCc8Mo",
    authDomain: "react-trello-dc0de.firebaseapp.com",
    databaseURL: "https://react-trello-dc0de.firebaseio.com",
    projectId: "react-trello-dc0de",
    storageBucket: "react-trello-dc0de.appspot.com",
    messagingSenderId: "824059261675",
    appId: "1:824059261675:web:9703c1d85554dd8810c4ae",
    measurementId: "G-JN20JRC50H"
}

firebase.initializeApp(config)

const db=firebase.firestore()

const boardsRef=db.collection('boards')
const listsRef=db.collection('lists')
const cardsRef=db.collection('cards')

export {boardsRef,listsRef, cardsRef}



