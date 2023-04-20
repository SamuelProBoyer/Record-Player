// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
// import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd_ozmP94ts6H_Q-MjTlsGkvIEqzbwW6M",
  authDomain: "record-player-app.firebaseapp.com",
  projectId: "record-player-app",
  storageBucket: "record-player-app.appspot.com",
  messagingSenderId: "459656220212",
  appId: "1:459656220212:web:a67db336088a7498468461"
};

const Googleprovider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, Googleprovider, firebaseConfig, storage}









// const [mesMusiques, setMesMusiques] = useState([]);

    // useEffect(() => {
    //     if(user.uid) {
    //         const musiques = [];
    //         const trouverMusiques = async() => {
    //             const musiquesRef = collection(db, "musiques");
    //             const q = query(musiquesRef, where("userId", "array-contains", user.uid));
    //             const querySnapshot = await getDocs(q);
    //             querySnapshot.forEach((doc) => {
    //                 const data = doc.data();
    //                 data.id = doc.id;
    //                 musiques.push(data);
                    
    //             });
    //             setMesMusiques(musiques);
    //         }
    //         trouverMusiques();
    //     }
    // }, [user?.uid]);
    // console.log(mesMusiques);