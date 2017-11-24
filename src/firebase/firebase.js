import * as firebase from 'firebase';

class Firebase {

    // For initializing firebase
    static initialise() {
      firebase.initializeApp({
        apiKey: "AIzaSyBFsaOFf2vE1PdLBF0RTJ-OqWmBt2Mg35o",
        authDomain: "budgetapp-691cd.firebaseapp.com",
        databaseURL: "https://budgetapp-691cd.firebaseio.com",
        projectId: "budgetapp-691cd",
        storageBucket: "budgetapp-691cd.appspot.com",
        messagingSenderId: "687213014880"
      });
    }
}

module.exports = Firebase;
