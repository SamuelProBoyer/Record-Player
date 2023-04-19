import { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import "./fileimport.css";
import { db } from "../config/firebase";
import AnimatedPage from "./AnimatedPage";
import { Link } from "react-router-dom";

function FileImport() {

  const [newChanson, setNewChanson] = useState({
    filename: "",
    namesong: "",
    image: "",
  });
  const addDoc = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      filename: newChanson.filename,
      namesong: newChanson.namesong,
      image: newChanson.image,
    });
    console.log(docRef.id);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setNewChanson(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  return (
    <>
      <AnimatedPage>
      <div className="title-ari-container">
          <h1>Importer mes musiques</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Importer ma musique</span>
          </p>
        </div>
        <div className="upload-container">
          <div className="wrapper">
            <div className="input-container">
              <p>Nom du fichier : {newChanson.filename}</p>
              <input maxlength="30" type="text" name="filename" value={newChanson.filename} onChange={handleChange} />
              <p>Nom de la chanson :  {newChanson.namesong}</p>
              <input maxlength="30" type="text" name="namesong" value={newChanson.namesong} onChange={handleChange} />
              <p>Thumbnail  : </p>
              <input type="file" name="image" value={newChanson.image} onChange={handleChange} />
            </div>
            <button className="btn">
              Upload dans mes musiques
            </button>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
}
export default FileImport;
