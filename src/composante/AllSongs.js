import AnimatedPage from "./AnimatedPage";
import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../config/firebase";
import { useContext } from "react";
import { authContext } from "../AuthContext/authContext";
import { Link } from "react-router-dom";
import BottomNavPlayer from "./BottomNavPlayer";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const { user } = useContext(authContext);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Permet daller chercher les chansons upload par lutilisateur
  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, "musiques"));
      querySnapshot.forEach((doc) => {
        setSongs((prevSongs) => [...prevSongs, doc.data()]);
      });
    };

    fetchSongs();
  }, [user.uid]);
  // Permet d'afficher les chansons upload par lutilisateur
  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h1 className="feature-title">Toutes les musiques</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Toutes les musiques</span>
          </p>
        </div>
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
        {isPlaying && (
          <BottomNavPlayer
            songs={songs}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </AnimatedPage>
    </>
  );
};

export default AllSongs;
