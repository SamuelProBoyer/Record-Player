import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import './recordPlayer.css';
import Header from './Header';
import Footer from './Footer';
import { db } from '../config/firebase';
import { useState } from 'react';






const RecordPlayer = () => {
    console.log(db);

    const [isPlaying, setIsPlaying] = useState(false);
    const audio = document.getElementById("audio");
    


    // A changer pour handle le commencement des musiques. !!!
    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };



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
                    <audio id='audio' src="./Audio/SEMILOFI.mp3"></audio>
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