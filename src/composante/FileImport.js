import { useState, useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import "./fileimport.css";
import { storage } from "../config/firebase";
import { authContext } from "../AuthContext/authContext";

function FileImport() {
  const [file, setFile] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [percent, setPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useContext(authContext);

  let i = 0;
  const handleIncrementation = () => {
    i++;
    console.log(i);
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
              console.log("Song ajouter a ma collection user");
            })
            .catch((error) => {
              console.log(error);
            });

          const audio = new Audio(url);

          const playButton = document.getElementById("playButton");
          playButton.addEventListener("click", () => {
            setIsPlaying(!isPlaying);
            isPlaying ? audio.pause() : audio.play();
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
      <h1>Importer mes musiques</h1>
      <div className="upload-container">
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
          <input
            type="text"
            placeholder="Nom de la chanson"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <input
            className="upload-input"
            type="file"
            onChange={handleChange}
            accept="/musiques/*"
          />
          <input className="upload-input" type="file" onChange={handleImg} />
          <button className="btn" onClick={handleUpload}>
            Upload dans mes musiques
          </button>
          <p className="uplaod-percent">{percent} "% complété"</p>
        </div>
      </div>
    </>
  );
}
export default FileImport;
