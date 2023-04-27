import { useState, useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { storage } from "../config/firebase";
import { authContext } from "../Providers/authContext";
import "./fileimport.css";
import AnimatedPage from "./AnimatedPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMusic,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HeaderSmaller from "./HeaderSmaller";

function FileImport() {
  const [file, setFile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [percent, setPercent] = useState(0);
  const { user } = useContext(authContext);

  let i = 0;
  const handleIncrementation = () => {
    i++;
  };
  function handleChange(event) {
    setFile(event.target.files[i]);
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Ajoute une chanson avant !");
    }
    if (!inputValue) {
      alert("Ajoute un nom avant !");
    }
    if (!imageSrc) {
      alert("Ajoute une image avant !");
    }

    const storageRef = ref(storage, `/musiques/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          handleIncrementation();

          const newSong = {
            image: imageSrc,
            namesong: inputValue,
            url: url,
            timestamp: new Date(),
          };
          const usersRef = collection(db, "users");
          const userRef = doc(usersRef, user.uid);
          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            return console.log("Document de user nexiste pas");
          }
          const userSongs = docSnap.data().songs;
          const songsArray = Object.values(userSongs); // conversion en tableau
          const updatedSongs = [...songsArray, newSong]; // ajout de la nouvelle chanson
          await updateDoc(userRef, { songs: updatedSongs });

          setFile("");
          setInputValue("");
          setImageSrc("");

          console.log("Song ajouter a ma collection user");
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const handleImg = (e) => {
    const file = e.target.files[i];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  };

  return (
    <>
      <HeaderSmaller />
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Importer mes Tunes</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Importer Tunes</span>
          </p>
        </div>
        <div id="fileimport" className="upload-container">
          <div className="wrapper">
            <div
              className="card-container"
              style={{ backgroundImage: `url(${imageSrc})` }}
            >
              <div className="btn-add-remove">
                <button className="btn-small">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <h3 className="title-songs">{inputValue}</h3>
                <button className="btn-small">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            </div>
            <div className="input-container">
              <label className="label-name">Choisir votre nom de la Tune</label>
              <input
                className="input-title"
                type="text"
                placeholder="Nom de la Tune"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                maxLength={20}
              />
              <div className="container-input">
                <label className="label-name">
                  Choisir votre Tune
                  <span>
                    <FontAwesomeIcon icon={faMusic} />
                  </span>
                  <input
                    className="upload-input"
                    type="file"
                    onChange={handleChange}
                    accept="/musiques/*"
                  />
                </label>
              </div>
              <div className="container-input">
                <label className="label-name">
                  Choisir votre image
                  <span>
                    <FontAwesomeIcon icon={faImage} />
                  </span>
                  <input
                    className="upload-input"
                    type="file"
                    onChange={handleImg}
                  />
                </label>
              </div>
              <button className="btn" onClick={handleUpload}>
                Upload dans ma bibliothèque
              </button>
              <p className="uplaod-percent">{percent} "% complété"</p>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
}
export default FileImport;
