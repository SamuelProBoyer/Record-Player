import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import './recordPlayer.css';
import Header from './Header';
import Footer from './Footer';
import { db } from '../config/firebase';
import { useState } from 'react';
import { useRef } from 'react';
import audioFile from '../SEMILOFI.mp3';






const RecordPlayer = () => {

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


    // console.log(audio);
    return (
        <>
            {/* <Header /> */}
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

            {/* <Footer/> */}
        </>
    )
}

export default RecordPlayer;