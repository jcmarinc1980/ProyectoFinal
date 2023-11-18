
import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn-WUZePKVLC_oHlgBMs-mUHWyYY-nh_Q",
  authDomain: "proyectosi-50f31.firebaseapp.com",
  projectId: "proyectosi-50f31",
  storageBucket: "proyectosi-50f31.appspot.com",
  messagingSenderId: "18258569822",
  appId: "1:18258569822:web:eb5090bcb2cf041389a2cf",
  measurementId: "G-D9J5NPYR5J"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const storage = firebase.storage();

export { storage, firebase as default };