import AnimatedPage from "./AnimatedPage";
import { useState, useRef } from "react";
import { getDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { useContext } from "react";
import { songsContext } from "../Providers/SongProvider";
import { authContext } from "../Providers/authContext";
import { Link } from "react-router-dom";
import HeaderSmaller from "./HeaderSmaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faCircleXmark,
  faPlay,
  faPause,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import "./AllSongs.css";
import BottomNavPlayer from "./BottomNavPlayer";

const AllSongs = () => {
  const { user } = useContext(authContext);
  const { allSongs } = useContext(songsContext);
  const [showModal, setShowModal] = useState(false);
  const [modalTextValue, setModalTextValue] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    namesong: "",
    url: "",
    image: "",
  });
  const audioRef = useRef(null);

  // Joue une Tune
  const handleAudio = (url, play) => {
    const song = allSongs.find((song) => song.url === url);
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
      setCurrentSong(null);
    }
    setCurrentSong(song);
  };

  // Handler pour ajouter une Tune dans le user collection
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
      {/* <HeaderSmaller /> */}
      <AnimatedPage>
        <div className="title-ari-container">
          <h1 className="feature-title">
            Bibliothèque publique{" "}
            <span className="icon-music">
              <FontAwesomeIcon icon={faMusic} style={{ color: "#56aeff" }} />
            </span>
          </h1>
          {/* <p>
            <Link to="/">Accueil</Link> / <span>Bibliothèque publique</span>
          </p> */}
        </div>
        <ul className="container-allsongs">
          {allSongs.map(({ image, namesong, url }) => {
            const isInUserSongs =
              user.songs?.findIndex((song) => song.url === url) > -1;
            return (
              <div
                className={`wrapper-card ${
                  isInUserSongs ? "wrapper-card-red" : ""
                }`}
              >
                <div
                  className="card-allsongs"
                  key={namesong}
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="audio-container-allsongs">
                  <div className="allsongs-btn-add-remove">
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
                    <h3 className="title-allsongs">{namesong}</h3>
                    <button
                      title="Ajouté dans ma Bibliothèque"
                      className="btn-small btn-add"
                      onClick={() => handleAddSongs({ image, namesong, url })}
                    >
                      <FontAwesomeIcon icon={faSquarePlus} />
                    </button>
                  </div>
                  <audio className="primaryAudio" ref={audioRef}>
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                {tuneIsPlaying ? (
                  <BottomNavPlayer
                    currentSong={currentSong}
                    tuneIsPlaying={tuneIsPlaying}
                    url={currentAudioUrl}
                    audioRef={audioRef}
                    handleAudio={handleAudio}
                  />
                ) : null}
              </div>
            );
          })}
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
