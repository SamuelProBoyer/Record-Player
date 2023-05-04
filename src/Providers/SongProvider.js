import { createContext, useState, useEffect, useContext, useRef } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { authContext } from "./authContext";

const songsContext = createContext([]);

const { Provider } = songsContext;

// Prend tous les tunes de l'utilisateur et de musiques
const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const { user } = useContext(authContext);

  const audioRef = useRef(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [currentSong, setCurrentSong] = useState({
    namesong: "",
    url: "",
    image: "",
  });
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);

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

  useEffect(() => {
    const fetchAllSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "musiques"));
      querySnapshot.forEach((doc) => {
        setAllSongs((prevSongs) => [...prevSongs, doc.data()]);
      });
    };

    fetchAllSongs();
  }, []);

  // Handler qui permet de faire jouer la Tune
  const handleAudio = (url, play) => {
    console.log("handleAudio called with url:", url, "and play:", play);
    if (currentAudioUrl && currentAudioUrl !== url && play) {
      console.log("Pausing current audio");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    } else if (currentAudioUrl !== url) {
      console.log("Starting new audio");
      setCurrentAudioUrl(url);
      setTuneIsPlaying(true);
      audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
      const song = songs.find((song) => song.url === url);
      setCurrentSong({
        namesong: song.namesong,
        url: song.url,
        image: song.image,
      });
    } else if (!play) {
      console.log("Pausing current audio");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    }
  };

  return (
    <Provider
      value={{
        songs,
        setSongs,
        allSongs,
        currentSong,
        audioRef,
        tuneIsPlaying,
        handleAudio,
        setTuneIsPlaying,
      }}
    >
      {children}
    </Provider>
  );
};

export { SongsProvider, songsContext };
