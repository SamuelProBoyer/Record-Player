import { useState, useEffect, useRef } from "react";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const AdminPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);

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

  const handleAddFlaggedSong = async (songs) => {
    const q = query(collection(db, "musiques"), where("url", "==", songs.url));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      return;
    }
    const docRef = await addDoc(collection(db, "musiques"), {
      namesong: songs.namesong,
      url: songs.url,
      image: songs.image,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const handleAudio = (url, play) => {
    if (currentAudioUrl && currentAudioUrl !== url && !play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
    } else if (currentAudioUrl !== url) {
      setCurrentAudioUrl(url);
      setTuneIsPlaying(true);
      audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
    } else if (!play) {
      audioRef.current = new Audio(null);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
    }
  };

  return (
    <>
      <Header />
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
                className="btn-small btn-add"
                onClick={() => handleAddFlaggedSong({ image, namesong, url })}
              >
                <FontAwesomeIcon icon={faSquarePlus} />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default AdminPage;
