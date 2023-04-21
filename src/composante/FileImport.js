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



  // console.log(i);
  // const [newSong, setNewSong] = useState({
  //   filename: "",
  //   url: "",
  //   image: ""
  // });
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

          // Create a new song object with the image, name, and URL of the newly uploaded song
          const newSong = {
            image: "New song image URL",
            namesong: "New song name",
            url: url
          };

          const usersRef = collection(db, "users");
          const userRef = doc(usersRef, user.uid);

          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userSongs = docSnap.data().songs;
                const songsArray = Object.values(userSongs); // Convert to array
                const updatedSongs = [...songsArray, newSong]; // Add new song
                return updateDoc(userRef, { songs: updatedSongs });
              } else {
                console.log("User document does not exist");
              }
            })
            .then(() => {
              console.log("Song added to user's collection");
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
