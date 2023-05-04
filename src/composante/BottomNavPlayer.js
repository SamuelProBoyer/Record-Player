import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import "./BottomNavPlayer.css";

const BottomNavPlayer = ({ currentSong, tuneIsPlaying, currentAudioUrl, handleAudio }) => {
  return (
    <div className="bottom-nav-player">
      {currentSong && (
        <div className="player-info">
          <img src={currentSong.image} alt="test" />
          <div className="song-info">
            <div className="song-name">{currentSong.namesong}</div>
          </div>
          {tuneIsPlaying ? (
            <FontAwesomeIcon
              icon={faPauseCircle}
              style={{ color: "#ffffff" }}
              className="playPause-Btn"
              onClick={(e) => handleAudio(false)}
              />
              ) : (
                <FontAwesomeIcon
                icon={faPlayCircle}
                style={{ color: "#ffffff" }}
                className="playPause-Btn"
                onClick={(e) => handleAudio(true)}
            />
          )}
        </div>
      )}
      <div className="player-controls">
        <audio  className="bottomPlayerAudio" >
          <source src={currentAudioUrl} type="audio/mpeg" />
          Votre fureteur ne support pas l'élément audio.
        </audio>
      </div>
    </div>
  );
};

export default BottomNavPlayer;
