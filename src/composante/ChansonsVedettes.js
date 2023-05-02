import AnimatedPage from "./AnimatedPage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { songsContext } from "../Providers/SongProvider";
import { Link } from "react-router-dom";

const ChansonsVedettes = () => {
  // const [currentSong, setCurrentSong] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const { songs } = useContext(songsContext);
  const audioRef = useRef(null);
  const lastFourSongs = songs.slice(-4);
  const sortedLastFourSongs = [...lastFourSongs].sort((a, b) =>
    a.namesong.localeCompare(b.namesong)
  );

  const handleAudio = (url, play) => {
    if (currentAudioUrl && currentAudioUrl !== url && !play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
    } else if (currentAudioUrl !== url) {
      setCurrentAudioUrl(url);
      setTuneIsPlaying(true);
      audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
    } else if (!play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
    }
  };

  return (
    <>
      <div className="vedette-title-section">
        <h2 className="featured-title">
          Les ajouts récents
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
                  {tuneIsPlaying && currentAudioUrl === url ? (
                    <button
                      className="btn-small playPauseBtn"
                      onClick={() => handleAudio(url, false)}
                    >
                      <FontAwesomeIcon
                        icon={faPause}
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                  ) : (
                    <button
                      className="btn-small playPauseBtn"
                      onClick={() => handleAudio(url, true)}
                    >
                      <FontAwesomeIcon
                        icon={faPlay}
                        style={{ color: "#ffffff" }}
                      />
                    </button>
                  )}

                  <audio className="primaryAudio" ref={audioRef}>
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
