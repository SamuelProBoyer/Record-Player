import { createContext, useState, useEffect, useContext } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { authContext } from "../AuthContext/authContext";

export const SongsContext = createContext([]);

const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  

  useEffect(() => {
    const fetchSongs = async () => {
      const collectionRef = collection(db, "users");
      const userDocRef = doc(collectionRef, user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const userSongs = docSnap.data().songs;
        const sortedSongs = userSongs.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        const latestSongs = sortedSongs.slice(0, 4);

        const songUrls = latestSongs.map((song) => {
          return {
            url: song.url,
            namesong: song.namesong,
            image: song.image,
            timestamp: song.timestamp,
          };
        });
        setSongs(songUrls);
      } else {
        console.log("Document utilisateur nexiste pas");
      }
    };

    fetchSongs();
  }, [user.uid]);


  return (
    <SongsContext.Provider value={songs}>{children}</SongsContext.Provider>
  );
};

export default SongsProvider;
