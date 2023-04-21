import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
// import Modal from '../Modal/Modal';
import { useEffect, useContext } from "react";
import { collection, getDoc, doc } from "@firebase/firestore";
import { db } from "../config/firebase";
import "./musiques.css";
import { authContext } from "../AuthContext/authContext";

const Musiques = () => {
  // const [isPlaying, setIsPlaying] = useState([]);
  // const [show, setShow] = useState(false);
  // const audioRefs = useRef([]);
  const [songs, setSongs] = useState([]);
  const {user} = useContext(authContext);

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
          {songs.map((songUrl, index) => (
            <div className="card-container" key={index} style={{ backgroundImage: `url(${songUrl.image})` }}>
              <h3>{songUrl.namesong}</h3>
              {/* <img src={songUrl.image} alt={songUrl.namesong} /> */}
              <audio controls>
                <source src={songUrl.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
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
