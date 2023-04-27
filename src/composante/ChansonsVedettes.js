import AnimatedPage from "./AnimatedPage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { songsContext } from "../Providers/SongProvider";
import { Link } from "react-router-dom";

const ChansonsVedettes = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { songs } = useContext(songsContext);
  const lastFourSongs = songs.slice(-4);
  const sortedLastFourSongs = [...lastFourSongs].sort((a, b) =>
    a.namesong.localeCompare(b.namesong)
  );
  console.log(currentSong);

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
        {sortedLastFourSongs ? (
          <ul className="container container-last-song">
            {sortedLastFourSongs.map(({ image, namesong, url }) => (
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
