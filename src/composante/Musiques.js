import './musiques.css';     
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRef } from 'react';
import audioFile from '../SEMILOFI.mp3';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';


const Musiques = () => {
  const [isPlaying, setIsPlaying] = useState(false);
    const song = audioFile;
    const audioRef = useRef(null);
    
    


    // A changer pour handle le commencement des musiques. !!!
    const handleClick = () => {
        const audioElement = audioRef.current;
        if(audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
        setIsPlaying(!isPlaying);
    };
  return (
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Mes musiques</h1>
          <p><Link to="/">Accueil</Link> / <span>Musiques</span></p>
        </div>
        <ul className="container">
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <audio ref={audioRef} src={song}></audio>
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
                  <li className="item">
                      <img
                          className="playlist-image"
                          src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                          alt="lofi"
                      />
                      <button onClick={handleClick} className='fa-icons-record'><FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} /></button>
                      <h3 className="playlist-name">Chanson 1</h3>
                  </li>
              </ul>
      </AnimatedPage>
    </>
  );
};

export default Musiques;
