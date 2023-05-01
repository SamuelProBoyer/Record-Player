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
import "./musiques.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCircleXmark,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import { songsContext } from "../Providers/SongProvider";
import HeaderSmaller from "./HeaderSmaller";
// import { authContext } from "../Providers/authContext";
const Musiques = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTextValue, setModalTextValue] = useState("");
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  // const [currentTime, setCurrentTime] = useState(0);
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);
  const { songs } = useContext(songsContext);
  const audioRef = useRef(null);
  // console.log(audio.current);

  // const { user } = useContext(authContext);

  // Ajouter une musique à toutes les musiques
  const handleAddSongs = async (song) => {
    const q = query(collection(db, "musiques"), where("url", "==", song.url));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return;
    }
    const docRef = await addDoc(collection(db, "musiques"), {
      namesong: song.namesong,
      url: song.url,
      image: song.image,
    });
    console.log("Document written with ID: ", docRef.id);
    setModalTextValue("Tune ajouté dans la bibliothèque publique");
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

  const handlePlay = (url) => {

    if (currentAudioUrl) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // setCurrentTime(audioRef.current.currentTime);
    setCurrentAudioUrl(url);
    setTuneIsPlaying(!tuneIsPlaying);
    audioRef.current = new Audio(url);
    audioRef.current.play();
  };

  const handlePause = (url) => {
    if (currentAudioUrl) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // setCurrentTime(audioRef.current.currentTime);
    setCurrentAudioUrl(url);
    setTuneIsPlaying(!tuneIsPlaying);
    audioRef.current.pause();
  }

  console.log(currentAudioUrl);
  console.log(tuneIsPlaying);
  return (
    <>
      <HeaderSmaller />
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Ma Bibliothèque</h1>
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
                    className="btn-small"
                    onClick={() => handleAddSongs({ url, namesong, image })}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <h3 className="title-songs">{namesong}</h3>
                  <button
                    className="btn-small"
                    onClick={() => handleDeleteSong(url)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>

                <div className="audio-container">
                  {tuneIsPlaying ? (<button className="btn-small playPauseBtn" onClick={(e) => handlePause(url)}>
                    <FontAwesomeIcon icon={faPause} style={{ color: "#ffffff", }} />
                  </button>) : (<button className="btn-small playPauseBtn" onClick={(e) => handlePlay(url)}>
                    <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff", }} />
                  </button>)}
                  {/* <input type="range" value={currentTime} max={audioRef.current?.duration} onChange={(e) => audioRef.current.currentTime = e.target.value}/> */}

                  <audio
                    className="primaryAudio"
                    ref={audioRef}
                  >
                    <source src={url} type="audio/mpeg" />
                    Votre fureteur ne support pas l'élément audio.
                  </audio>
                </div>


              </div>
            ))}
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
