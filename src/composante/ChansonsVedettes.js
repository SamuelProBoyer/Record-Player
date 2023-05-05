import AnimatedPage from "./AnimatedPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import { songsContext } from "../Providers/SongProvider";
import { Link } from "react-router-dom";
import BottomNavPlayer from "./BottomNavPlayer";

const ChansonsVedettes = () => {
  const [tuneIsPlaying, setTuneIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const { songs } = useContext(songsContext);
  const [currentSong, setCurrentSong] = useState({
    namesong: "",
    url: "",
    image: "",
  });
  const audioRef = useRef(null);
  const lastFourSongs = songs.slice(-4);
  const sortedLastFourSongs = [...lastFourSongs].sort((a, b) =>
    a.namesong.localeCompare(b.namesong)
  );

  const handleAudio = (url, play) => {
    const song = songs.find((song) => song.url === url);
    if (currentAudioUrl && currentAudioUrl !== url && !play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    } else if (currentAudioUrl !== url) {
      setCurrentAudioUrl(url);
      setTuneIsPlaying(true);
      audioRef.current.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setCurrentSong({
        namesong: song.namesong,
        url: song.url,
        image: song.image,
      });
    } else if (!play) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTuneIsPlaying(false);
      setCurrentAudioUrl(null);
    }
    setCurrentSong(song);
  };
  return (
    <>
      <div className="vedette-title-section">
        <h2 className="featured-title">
          Vos ajouts récents
          <Link to="/musiques">
            <span className="icon-music">
              <FontAwesomeIcon icon={faMusic} style={{ color: "#56aeff" }} />
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
                {tuneIsPlaying ? (
                  <BottomNavPlayer
                  currentSong={currentSong}
                  tuneIsPlaying={tuneIsPlaying}
                  currentAudioUrl={currentAudioUrl}
                  audioRef={audioRef}
                  handleAudio={handleAudio}
                  />
                ) : null}
              </div>
            ))}
          </ul>
        ) : (
          <>
            <p>Vous n'avez pas de Tune encore !</p>
            <button className="btn">
              <Link to="/fileimport">Ajouter des tunes !</Link>
            </button>
          </>
        )}
      </AnimatedPage>
    </>
  );
};

export default ChansonsVedettes;
