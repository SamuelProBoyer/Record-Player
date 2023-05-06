import { useState, useEffect, useRef } from "react";
import { collection, getDocs, where, query, addDoc, deleteDoc } from "firebase/firestore";
import BottomNavPlayer from "./BottomNavPlayer";
import { db } from "../config/firebase";
import HeaderSmaller from "./HeaderSmaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faSquareMinus,
  faPlay,
  faPause,
  faMusic
} from "@fortawesome/free-solid-svg-icons";
const AdminPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const songsCollection = collection(db, "flagMusiques");
      const songsSnapshot = await getDocs(songsCollection);
      const songsList = songsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSongs(songsList);
    };

    fetchSongs();
  }, []);

  const handleAddFlaggedSong = async (song) => {
    const musiquesQuery = query(collection(db, "musiques"), where("url", "==", song.url));
    const musiquesQuerySnap = await getDocs(musiquesQuery);
    if (!musiquesQuerySnap.empty) {
      return;
    }
    
    const flagMusiquesQuery = query(collection(db, "flagMusiques"), where("url", "==", song.url));
    const flagMusiquesQuerySnap = await getDocs(flagMusiquesQuery);
    if (!flagMusiquesQuerySnap.empty) {
      flagMusiquesQuerySnap.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }
  
    const docRef = await addDoc(collection(db, "musiques"), {
      namesong: song.namesong,
      url: song.url,
      image: song.image,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const handleDeleteFlaggedSong = async(song) => {
    const tuneQuery = query(collection(db, "flagMusiques"), where("url", "==", song.url));
    const tuneQuerySnap = await getDocs(tuneQuery);
    if(!tuneQuerySnap.empty) {
      tuneQuerySnap.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      })
    }
  }
  

  const handleAudio = (url, play) => {
    const song = songs.find((song) => song.url === url);
    if (currentAudioUrl && currentAudioUrl !== url && !play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    } else if (currentAudioUrl !== url) {
      setCurrentAudioUrl(url);
      setTuneIsPlaying(true);
      audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setCurrentSong({
        namesong: song.namesong,
        url: song.url,
        image: song.image,
      });
    } else if (!play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    }
    setCurrentSong(song);
  };

  return (
    <>
      <HeaderSmaller />
      <div className="title-ari-container">
          <h1 className="feature-title">
            Administration{" "}
            <span className="icon-music">
              <FontAwesomeIcon icon={faMusic} style={{ color: "#56aeff" }} />
            </span>
          </h1>
        </div>
      <ul className="container-allsongs">
        {songs.map(({ image, namesong, url }) => (
          <div className="wrapper-card">
            <div
              className="card-allsongs"
              key={url}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="audio-container-allsongs">
              {tuneIsPlaying && currentAudioUrl === url ? (
                <button
                  className="btn-small playPauseBtn"
                  onClick={() => handleAudio(url, false)}
                >
                  <FontAwesomeIcon
                    icon={faPause}
                    style={{ color: "#ffffff" }}
                  />
                </button>
              ) : (
                <button
                  className="btn-small playPauseBtn"
                  onClick={() => handleAudio(url, true)}
                >
                  <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff" }} />
                </button>
              )}
              <audio className="primaryAudio" ref={audioRef}>
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="allsongs-btn-add-remove">
              <h3 className="title-allsongs">{namesong}</h3>
              <button
                className="btn-small btn-remove"
                onClick={() => handleDeleteFlaggedSong({ image, namesong, url })}
              >
                <FontAwesomeIcon icon={faSquareMinus} />
              </button>
              <button
                className="btn-small btn-add"
                onClick={() => handleAddFlaggedSong({ image, namesong, url })}
              >
                <FontAwesomeIcon icon={faSquarePlus} />
              </button>
            </div>
          </div>
        ))}
        {tuneIsPlaying ? (
              <BottomNavPlayer
                currentSong={currentSong}
                tuneIsPlaying={tuneIsPlaying}
                currentAudioUrl={currentAudioUrl}
                audioRef={audioRef}
                handleAudio={handleAudio}
              />
            ) : (
              null
            )}
      </ul>
    </>
  );
};

export default AdminPage;
