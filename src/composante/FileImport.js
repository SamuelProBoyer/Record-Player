import { useState } from "react";
import { storage } from "../config/firebase";
import {
  listAll,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./fileimport.css";

function FileImport() {

  const [file, setFile] = useState(""); 
  const [percent, setPercent] = useState(0); 
  const listRef = ref(storage, "musiques/uid");

  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        console.log(itemRef);
      });
    })
    .catch((e) => {
      console.log(e);
    });

  listAll();

  function handleChange(event) {
    setFile(event.target.files[0]);
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
          console.log(url);
        });
      }
    );
  };
  return (
    <>
      <h1>Importer mes musiques</h1>
      <div className="upload-container">
        <div className="wrapper">
          <input
            className="upload-input"
            type="file"
            onChange={handleChange}
            accept="/musiques/*"
          />
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
