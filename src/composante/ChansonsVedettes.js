import AnimatedPage from "./AnimatedPage";
import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { authContext } from "../AuthContext/authContext";

const ChansonsVedettes = () => {
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
        const sortedSongs = songObjects.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        console.log(sortedSongs);
        const latestSongs = sortedSongs.slice(0, 4);

        const songUrls = latestSongs.map((song) => {
          return {
            url: song.url,
            namesong: song.namesong,
            image: song.image,
            timestamp: new Date()
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
        <h2 className="featured-title">
          Dernière chansons ajoutées
          <span className="icon-music">
            <FontAwesomeIcon icon={faMusic} />
          </span>
        </h2>
        <ul className="container container-last-song">
          {songs.map(({ image, namesong, url }) => (
            <div
              className="card-container"
              key={url}
              style={{ backgroundImage: `url(${image})` }}
            >
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

export default ChansonsVedettes;
