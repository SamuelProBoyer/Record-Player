import { createContext, useState, useEffect, useContext } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { authContext } from "./authContext";

const songsContext = createContext([]);

const { Provider } = songsContext;

// Prend tous les tunes de l'utilisateur
const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchSongs = async () => {
      const collectionRef = collection(db, "users");
      const userDocRef = doc(collectionRef, user.uid);
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        return console.log("Document utilisateur n'existe pas");
      }
      const userSongs = docSnap.data().songs;
      const songObjects = Object.values(userSongs);
      const songUrls = songObjects.map((song, i) => {
        return {
          url: song.url,
          namesong: song.namesong,
          image: song.image,
          timestamp: song.timestamp,
        };
      });
      setSongs(songUrls);
    };
    fetchSongs();
  }, [user.uid]);

  return <Provider value={{ songs }}>{children}</Provider>;
};

export { SongsProvider, songsContext };
