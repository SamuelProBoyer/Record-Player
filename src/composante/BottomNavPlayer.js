import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import "./BottomNavPlayer.css";

const BottomNavPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(songs[currentSongIndex]?.url));
  console.log(songs[currentSongIndex]);

  useEffect(() => {
    // Update the audio object whenever the current song changes
    audio.src = songs[currentSongIndex]?.url;

    // If the player is supposed to be playing, play the new song automatically
    if (isPlaying) {
      audio.play();
    }
  }, [currentSongIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (currentSongIndex === songs.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songs.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
    setIsPlaying(true);
  };

  return (
    <div className="bottom-nav-player">
      <div className="player-info">
        <img src={songs[currentSongIndex]?.image} alt={songs[currentSongIndex]?.namesong} />
        <div className="song-info">
          <h3>{songs[currentSongIndex]?.namesong}</h3>
        </div>
      </div>
      <div className="player-controls">
        <button className="prev-song" onClick={handlePrevSong}>
          Prev
        </button>
        <button className="play-pause" onClick={togglePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} />
        </button>
        <button className="next-song" onClick={handleNextSong}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BottomNavPlayer;
