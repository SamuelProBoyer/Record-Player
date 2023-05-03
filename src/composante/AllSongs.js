import AnimatedPage from "./AnimatedPage";
import { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../config/firebase";
import { useContext } from "react";
import { authContext } from "../Providers/authContext";
// import { songsContext } from "../SongContext/SongProvider";
import { Link } from "react-router-dom";
import HeaderSmaller from "./HeaderSmaller";
// import BottomNavPlayer from "./BottomNavPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faCircleXmark,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import "./AllSongs.css";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  const [showModal, setShowModal] = useState(false);
  const [modalTextValue, setModalTextValue] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // Permet daller chercher les chansons upload par lutilisateur
  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "musiques"));
      querySnapshot.forEach((doc) => {
        setSongs((prevSongs) => [...prevSongs, doc.data()]);
      });
    };

    fetchSongs();
  }, [user.uid]);

  const handleAudio = (url, play) => {
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
    } else if (!play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null); 
    }
  };

  const handleAddSongs = async (song) => {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return;
    }
    const userData = userDoc.data();
    const userSongs = userData.songs || [];
    userSongs.push(song);
    await updateDoc(userRef, { songs: userSongs });

    setShowModal(true);
    setModalTextValue("Tune ajouté dans votre bilbiothèque");
  };

  return (
    <>
      <HeaderSmaller />
      <AnimatedPage>
        <div className="title-ari-container">
          <h1 className="feature-title">Bibliothèque publique</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Bibliothèque publique</span>
          </p>
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
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ color: "#ffffff" }}
                    />
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
                  onClick={() => handleAddSongs({ image, namesong, url })}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </button>
              </div>
            </div>
          ))}
        </ul>
      </AnimatedPage>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{modalTextValue}</h3>
            </div>
            <button className="btn-modal" onClick={() => setShowModal(false)}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllSongs;
