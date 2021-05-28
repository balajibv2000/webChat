import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDgqaYuj3KGHad12U22EZygSLKaGdJ0tKo",
    authDomain: "webchat-bv-ca0a6.firebaseapp.com",
    projectId: "webchat-bv-ca0a6",
    storageBucket: "webchat-bv-ca0a6.appspot.com",
    messagingSenderId: "112733395314",
    appId: "1:112733395314:web:e0e824bb67a6e2b4ec65eb",
    measurementId: "G-H0G25HDVV8"
})

const db = firebaseApp.firestore();

export default db;