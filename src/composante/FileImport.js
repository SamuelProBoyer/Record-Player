import { useState, useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { storage } from "../config/firebase";
import { authContext } from "../AuthContext/authContext";
import "./fileimport.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";

function FileImport() {
  const [file, setFile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [percent, setPercent] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  let i = 0;
  const handleIncrementation = () => {
    i++;
  };
  function handleChange(event) {
    setFile(event.target.files[i]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Ajoute une chanson avant !");
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleIncrementation();

          const newSong = {
            image: imageSrc,
            namesong: inputValue,
            url: url,
          };

          const usersRef = collection(db, "users");
          const userRef = doc(usersRef, user.uid);

          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userSongs = docSnap.data().songs;
                const songsArray = Object.values(userSongs); // conversion en tableau
                const updatedSongs = [...songsArray, newSong]; // ajout de la nouvelle chanson
                return updateDoc(userRef, { songs: updatedSongs });
              } else {
                console.log("Document de user nexiste pas");
              }
            })
            .then(() => {
              // navigate("/musiques");
              console.log("Song ajouter a ma collection user");
            })
            .catch((error) => {
              console.log(error);
            });
        });
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
      <AnimatedPage>
        <h1>Importer mes musiques</h1>
        <div id="fileimport" className="upload-container">
          <div className="wrapper">
            <div
              className="card-container"
              style={{ backgroundImage: `url(${imageSrc})` }}
            >
              <h3 className="title-song">{inputValue}</h3>
              <div className="audio-container">
                <audio controls src=""></audio>
              </div>
            </div>
            <div className="input-container">
              <input
                className="input-title"
                type="text"
                placeholder="Nom de la chanson"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                maxLength={25}
              />
              <div className="container-input">
                <label className="label-name">Choisir votre chanson</label>
                <input
                  className="upload-input"
                  type="file"
                  onChange={handleChange}
                  accept="/musiques/*"
                />
              </div>
              <div className="container-input">
                <label className="label-name">Choisir votre image</label>
                <input
                  className="upload-input"
                  type="file"
                  onChange={handleImg}
                />
              </div>
              <button className="btn" onClick={handleUpload}>
                Upload dans mes musiques
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
