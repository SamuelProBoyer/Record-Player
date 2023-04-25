import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import { useEffect, useContext } from "react";
import { collection, getDoc,getDocs, where, doc, query, addDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import "./musiques.css";
import { authContext } from "../AuthContext/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import Modal from '../Modal/Modal';

const Musiques = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  const [isAble, setIsAble] = useState(false);

  // Permet daller chercher les chansons upload par lutilisateur
  useEffect(() => {
    const fetchSongs = async () => {
      const collectionRef = collection(db, "users");
      const userDocRef = doc(collectionRef, user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const userSongs = docSnap.data().songs;
        const songObjects = Object.values(userSongs);
        const songUrls = songObjects.map((song, i) => {
          return {
            url: song.url,
            namesong: song.namesong,
            image: song.image,
            timestamp: song.timestamp
          };
        });
        
        // console.log(songUrls.id);
        setSongs(songUrls);
      } else {
        // console.log("Document utilisateur nexiste pas");
      }
    };
    fetchSongs();
  }, [user.uid]);


  // Ajouter une musiques a toutes les musiques
  const handleAddSongs = async (song) => {
    const q = query(collection(db, "musiques"), where("url", "==", song.url));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert("Cette musique existe déjà dans le repertoire musical");
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
    alert("Musique ajoutée avec succès");
  };
  


  // Retirer une de mes musiques dans toutes les musiques
  const handleDeleteSong = async (url) => {
    const q = query(collection(db, "musiques"), where("url", "==", url));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      alert("Musique retirer avec succès");
    });
  };
  


  return (
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Mes musiques</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Musiques</span>
          </p>
        </div>
        <ul className="container-muse">
          {songs.map(({ namesong, url, image }) => (
            <div className="card-container" key={url} style={{ backgroundImage: `url(${image})` }}>
                 
                 <div className="btn-add-remove">
                   <button disabled={isAble} className="btn-small" onClick={() => handleAddSongs({url, namesong, image })}><FontAwesomeIcon icon={faPlus} /></button>
                   <button className="btn-small" onClick={() => handleDeleteSong(url)}><FontAwesomeIcon icon={faMinus} /></button>
                 </div>

               
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
      </AnimatedPage>
    </>
  );
};

export default Musiques;
