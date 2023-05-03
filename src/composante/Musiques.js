import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import { useContext } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../config/firebase";
import BottomNavPlayer from "./BottomNavPlayer";
import "./musiques.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCircleXmark,
  faPlay,
  faPause,
  faMusic
} from "@fortawesome/free-solid-svg-icons";
import { songsContext } from "../Providers/SongProvider";
import HeaderSmaller from "./HeaderSmaller";
const Musiques = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTextValue, setModalTextValue] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [currentSong, setCurrentSong] = useState({
    namesong: "",
    url: "",
    image: "",
  });
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);
  const { songs } = useContext(songsContext);
  const audioRef = useRef(null);

  // Ajouter une musique à dans la liste d'attente de l'admin
  const handleAddSongs = async (song) => {
    const q = query(
      collection(db, "flagMusiques"),
      where("url", "==", song.url)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return;
    }
    const docRef = await addDoc(collection(db, "flagMusiques"), {
      namesong: song.namesong,
      url: song.url,
      image: song.image,
    });
    console.log("Document written with ID: ", docRef.id);
    setModalTextValue("Tune ajouté dans la liste d'attente de l'admin");
    setShowModal(true);
  };

  // Retirer une de mes musiques dans toutes les musiques
  const handleDeleteSong = async (url) => {
    const q = query(collection(db, "musiques"), where("url", "==", url));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      setShowModal(true);
      setModalTextValue("Tune retiré de la bibliothèque publique");
    });
  };

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
      setCurrentSong({
        namesong: "",
        url: "",
        image: "",
      });
    } else if (!play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    }
    const song = songs.find((song) => song.url === url);
    setCurrentSong(song);
  };
  console.log(currentSong);
  return (
    <>
      <HeaderSmaller />
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Ma Bibliothèque <span className="icon-music"><FontAwesomeIcon icon={faMusic} style={{color: "#56aeff",}} /></span></h1>
          <span className="link-to-file">
            <Link to="/fileimport">Importer une Tune</Link>
          </span>
          <p>
            <Link to="/">Accueil</Link> / <span>Bibliothèque</span>
          </p>
        </div>
        <div className="wrapper-musique">
          <ul className="container-muse">
            {songs.map(({ namesong, url, image }) => (
              <div
                className="card-container"
                key={url}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="btn-add-remove">
                  <button
                    title="Ajouter à la bibliothèque publique"
                    className="btn-small"
                    onClick={() => handleAddSongs({ url, namesong, image })}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <h3 className="title-songs">{namesong}</h3>
                  <button
                    title="Retirer de la bibliothèque publique"
                    className="btn-small"
                    onClick={() => handleDeleteSong(url)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>

                <div className="audio-container">
                  {tuneIsPlaying && currentAudioUrl === url ? (
                    <button
                      className="btn-small playPauseBtn"
                      onClick={(e) => handleAudio(url, false)}
                    >
                      <FontAwesomeIcon
                        icon={faPause}
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                  ) : (
                    <button
                      className="btn-small playPauseBtn"
                      onClick={(e) => handleAudio(url, true)}
                    >
                      <FontAwesomeIcon
                        icon={faPlay}
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                  )}
                  <audio controls className="primaryAudio" ref={audioRef}>
                    <source src={url} type="audio/mpeg" />
                    Votre fureteur ne support pas l'élément audio.
                  </audio>
                </div>
              </div>
            ))}
            {tuneIsPlaying ? (
              <BottomNavPlayer
                currentSong={currentSong}
                tuneIsPlaying={tuneIsPlaying}
                url={currentAudioUrl}
                audioRef={audioRef}
              />
            ) : null}
          </ul>
        </div>
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
      </AnimatedPage>
    </>
  );
};

export default Musiques;
