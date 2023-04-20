import { useState, useContext } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../config/firebase";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import "./fileimport.css";
import { storage } from "../config/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { authContext } from "../AuthContext/authContext";



function FileImport() {

  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useContext(authContext);
  console.log(setAllFiles);


  // const [newSong, setNewSong] = useState({
  //   filename: file.name,
  //   url: "",
  //   image: ""
  // });

  // const updateSongs = (props, value) => {
  //   setNewSong((pervious) => {
  //     return {
  //     ...pervious,
  //       [props]: value,
  //     };
  //   });
  // };





  let i = 0;
  const handleIncrementation = () => {
    i++;
    console.log(i);
  }
  function handleChange(event) {
    setFile(event.target.files[i]);
  }



  console.log(i);
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

          const usersRef = collection(db, "users");
          const userRef = doc(usersRef, user.uid);

          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userChansons = docSnap.data().songs;
                const updatedChansons = { ...userChansons, [i]: url };
                return updateDoc(userRef, { songs: updatedChansons });
                
              } else {
                console.log("User document does not exist");
              }
            })
            .then(() => {
              console.log("URL added to user chansons");
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




  return (
    <>
      <h1>Importer mes musiques</h1>
      <div className="upload-container">
        <div className="files">
          {allFiles.map((file) => {
            return (
              <div className="file" key={Math.random()}>
                <p>{file.url}</p>
                <p>{file.name}</p>
                <button></button>
              </div>
            )
          })}
        </div>
        <div className="wrapper">
          <input
            className="upload-input"
            type="file"
            onChange={handleChange}
            accept="/musiques/*"
          />
          <div className="contentDiv">{file.name}</div>
          <p className="upload-text">Joue moi</p>
          <button id="playButton"><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>

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
