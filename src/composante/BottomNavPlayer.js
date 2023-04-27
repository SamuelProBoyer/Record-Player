import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import "./BottomNavPlayer.css";

const BottomNavPlayer = ({ isPlaying, setIsPlaying, currentSong }) => {
  console.log(currentSong);
  // const togglePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  // };

  // const handleNextSong = () => {
  //   if (currentSong === songs.length - 1) {
  //     setCurrentSong(currentSong);
  //   } else {
  //     setCurrentSong(currentSong + 1);
  //   }
  //   setIsPlaying(true);
  // };

  // const handlePrevSong = () => {
  //   if (currentSong === 0) {
  //     setCurrentSong(currentSong - 1);
  //   } else {
  //     setCurrentSong(currentSong - 1);
  //   }
  //   setIsPlaying(true);
  // };

  // console.log(currentSong);

  return (
    <div className="bottom-nav-player">
      <div className="player-info">
        <img src={currentSong?.image} alt={currentSong?.namesong} />
        <div className="song-info">
          <h3>{currentSong?.namesong}</h3>
        </div>
      </div>
      <div className="player-controls">
        <button className="play-pause" onClick={() => setIsPlaying(false)}>
          <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} />
        </button>
      </div>
    </div>
  );
};

export default BottomNavPlayer;
