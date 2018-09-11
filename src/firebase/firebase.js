import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBSHdrcNMm7GKhKts6DTbeHMX0UY8KLEdo",
    authDomain: "reactapp-c820b.firebaseapp.com",
    databaseURL: "https://reactapp-c820b.firebaseio.com",
    projectId: "reactapp-c820b",
    storageBucket: "reactapp-c820b.appspot.com",
    messagingSenderId: "520676535107"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
