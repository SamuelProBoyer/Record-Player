import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import { useEffect, useContext } from "react";
import {
  collection,
  getDoc,
  getDocs,
  where,
  doc,
  query,
  addDoc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../config/firebase";
import "./musiques.css";
import { authContext } from "../AuthContext/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Musiques = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  const [isAble, setIsAble] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  // Permet d'aller chercher les chansons uploadées par l'utilisateur
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

  // Ajouter une musique à toutes les musiques
  const handleAddSongs = async (song) => {
    const q = query(collection(db, "musiques"), where("url", "==", song.url));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // setShowModal(true);
      setIsAble(false);
      return;
    }
    setIsAble(true);
    const docRef = await addDoc(collection(db, "musiques"), {
      namesong: song.namesong,
      url: song.url,
      image: song.image,
    });
    console.log("Document written with ID: ", docRef.id);
    // setShowModal(true);
  };

  // Retirer une de mes musiques dans toutes les musiques
  const handleDeleteSong = async (url) => {
    const q = query(collection(db, "musiques"), where("url", "==", url));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      // setShowModal(true);
    });
  };

  return (
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Ma Bibliothèque</h1>
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
                    disabled={isAble}
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
                  <audio controls>
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))}
          </ul>
        </div>

     
      </AnimatedPage>
    </>
  );
};

export default Musiques;
