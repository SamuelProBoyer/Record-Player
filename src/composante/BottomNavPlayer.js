import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import "./BottomNavPlayer.css";

const BottomNavPlayer = ({
  songs,
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
}) => {
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (currentSong === songs.length - 1) {
      setCurrentSong(songs[currentSong]);
    } else {
      setCurrentSong(songs[currentSong] + 1);
    }
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (currentSong === 0) {
      setCurrentSong(songs[currentSong] - 1);
    } else {
      setCurrentSong(songs[currentSong] - 1);
    }
    setIsPlaying(true);
  };

  console.log(songs[currentSong]);

  return (
    <div className="bottom-nav-player">
      <div className="player-info">
        <img
          src={songs[currentSong]?.image}
          alt={songs[currentSong]?.namesong}
        />
        <div className="song-info">
          <h3>{songs[currentSong]?.namesong}</h3>
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
