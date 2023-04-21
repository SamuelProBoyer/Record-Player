import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import { useEffect, useContext } from "react";
import { collection, getDoc, doc } from "@firebase/firestore";
import { db } from "../config/firebase";
import "./musiques.css";
import { authContext } from "../AuthContext/authContext";
// import Modal from '../Modal/Modal';

const Musiques = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);

  // Permet daller chercher les chansons upload par lutilisateur
  useEffect(() => {
    const fetchSongs = async () => {
      const collectionRef = collection(db, "users");
      const userDocRef = doc(collectionRef, user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const userSongs = docSnap.data().songs;
        const songObjects = Object.values(userSongs);
        const songUrls = songObjects.map((song) => {
          return {
            url: song.url,
            namesong: song.namesong,
            image: song.image,
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
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Mes musiques</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Musiques</span>
          </p>
        </div>
        <ul className="container">
          {songs.map(({ namesong, url, image }) => (
            <div className="card-container" key={url} style={{ backgroundImage: `url(${image})` }}>
              <h3 className="title-song">{namesong}</h3>
              <div className="audio-container">
                <audio controls>
                  <source src={url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </ul>
        <div className="modal-container">
          {/* <Modal show={show} onClose={() => setShow(false)} /> */}
        </div>
      </AnimatedPage>
    </>
  );
};

export default Musiques;
