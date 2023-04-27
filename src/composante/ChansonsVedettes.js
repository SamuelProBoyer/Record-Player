import AnimatedPage from "./AnimatedPage";
import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { authContext } from "../AuthContext/authContext";
import { Link } from "react-router-dom";

const ChansonsVedettes = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(currentSong);

  // Permet daller chercher les chansons upload par lutilisateur
  useEffect(() => {
    const fetchSongs = async () => {
      const collectionRef = collection(db, "users");
      const userDocRef = doc(collectionRef, user.uid);
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        return console.log("No such document!");
      }
      const userSongs = docSnap.data().songs;
      const sortedSongs = userSongs.sort((a, b) => b.timestamp - a.timestamp);
      const latestSongs = sortedSongs.slice(0, 4);

      const songUrls = latestSongs.map((song) => {
        return {
          url: song.url,
          namesong: song.namesong,
          image: song.image,
          timestamp: song.timestamp,
        };
      });
      setSongs(songUrls);
    };
    fetchSongs();
  }, [user.uid]);

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="vedette-title-section">
        <h2 className="featured-title">
          Derniers ajouts dans votre bibliothèque
          <Link to="/musiques">
            <span className="icon-music">
              <FontAwesomeIcon icon={faMusic} />
            </span>
          </Link>
        </h2>
        <span className="link-to-file">
          <Link to="/fileimport">Importer une Tune</Link>
        </span>
      </div>
      <AnimatedPage>
        {songs ? (
          <ul className="container container-last-song">
            {songs.map(({ image, namesong, url }) => (
              <div
                className="card-container"
                key={url}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="btn-add-remove">
                  <button className="btn-small"></button>
                  <h3 className="title-songs">{namesong}</h3>
                  <button className="btn-small"></button>
                </div>
                <div className="audio-container">
                  <audio
                    controls
                    onPlay={() => handleSongClick({ url, namesong, image })}
                  >
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>Chargement des musiques...</p>
        )}
      </AnimatedPage>
    </>
  );
};

export default ChansonsVedettes;
