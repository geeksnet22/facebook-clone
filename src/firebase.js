import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCb8qn8FV2LKtxz1nbfkC71_duBGrxjc3w",
    authDomain: "facebook-clone-b2c57.firebaseapp.com",
    projectId: "facebook-clone-b2c57",
    storageBucket: "facebook-clone-b2c57.appspot.com",
    messagingSenderId: "76657865724",
    appId: "1:76657865724:web:89d94bf194c85e22903879",
    measurementId: "G-5EGDQKLBV5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };