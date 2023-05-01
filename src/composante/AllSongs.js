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
const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  // const [currentSong, setCurrentSong] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isAble, setIsAble] = useState(false);
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

  // const handleSongClick = (song) => {
  //   setCurrentSong(song);
  //   setIsAble(!isAble);
  //   setIsPlaying(!isPlaying);
  // };
  // console.log(currentSong);
  const handlePlay = (url) => {
    if (currentAudioUrl) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCurrentAudioUrl(url);
    setTuneIsPlaying(true);
    audioRef.current = new Audio(url);
    audioRef.current.play();
  };

  const handlePause = (url) => {
    if (currentAudioUrl) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCurrentAudioUrl(url);
    setTuneIsPlaying(false);
    audioRef.current.pause();
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
          <h1 className="feature-title">Toutes les Tunes</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Toutes les Tunes</span>
          </p>
        </div>
        <ul className="container container-last-song">
          {songs.map(({ image, namesong, url }) => (
            <div
              className="card-container"
              key={url}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="btn-add-remove">
                <button
                  className="btn-small btn-add"
                  onClick={() => handleAddSongs({ image, namesong, url })}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </button>
                <button className="btn-small"></button>
                <h3 className="title-songs">{namesong}</h3>
                <button className="btn-small"></button>
              </div>
              <div className="audio-container">
                {tuneIsPlaying ? (
                  <button
                    className="btn-small playPauseBtn"
                    onClick={() => handlePause(url)}
                  >
                    <FontAwesomeIcon
                      icon={faPause}
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                ) : (
                  <button
                    className="btn-small playPauseBtn"
                    onClick={() => handlePlay(url)}
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
