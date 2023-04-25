import AnimatedPage from "./AnimatedPage";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, addDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
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
        console.log(doc.id, " => ", doc.data());
        setSongs((prevSongs) => [...prevSongs, doc.data()]);
      });
    };

    fetchSongs();
  }, [user.uid]);

  // const handleAddSongs = async(song) => {
  //   const docRef = await addDoc(collection(db, "musiques"), {
  //     namesong: song.namesong,
  //     url: song.url,
  //     image: song.image,
  //     timestamp: song.timestamp,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // }

  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h2 className="featured-title">
            Toutes les chansons
            <Link to="/musiques">
              <span className="icon-music">
                <FontAwesomeIcon icon={faMusic} />
              </span>
            </Link>
          </h2>
          <p>
            <Link to="/">Accueil</Link> / <span>Tous les musiques</span>
          </p>
        </div>
        <ul className="container container-last-song">
          {songs.map(({ image, namesong, url }) => (
            <div
              className="card-container"
              key={url}
              style={{ backgroundImage: `url(${image})` }}
            >
              <h3 className="title-song">{namesong}</h3>
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
