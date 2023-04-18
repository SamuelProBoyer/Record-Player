import React, { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import { Googleprovider, auth } from "../config/firebase";


const authContext = React.createContext({
    login: () =>{},
    logout: () =>{},
    user: null
});


const {Provider} = authContext;

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async() => {
        try {
            const creds = await signInWithPopup(auth, Googleprovider);
            const docRef = doc(db, "users", creds.user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setUser(docSnap.data());
            }else {
                const docRef = doc(db, "users", creds.user.uid);
                await setDoc(docRef, {
                    nom: creds.user.displayName,
                    email: creds.user.email,
                    musiques: [],
                    id: creds.user.uid
                }, {
                    merge:true
                });
                setUser(creds.user);
            }
        }
        catch(e){
            if(e.code === 'auth/email-already-in-use') {
                return {success: false, msg: 'Courriel deja utilise'}
            }
        };
    };

    const logout = async() => {
        const deco = await signOut(auth);
        setUser(deco);
    };

    const unsub = auth.onAuthStateChanged(user => {
        setUser(user);
    });

    return (
        <Provider value={{login, logout, user, unsub}}>
            {children}
        </Provider>
    );
}

export {AuthProvider, authContext};