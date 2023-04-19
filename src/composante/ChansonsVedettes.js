import AnimatedPage from './AnimatedPage';
import { useState,useRef, useEffect } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause, faMusic, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


const ChansonsVedettes = () => {
    const [isPlaying, setIsPlaying] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [chansonsListe, setChansonListe] = useState([]);
    const audioRefs = useRef([]);
    
    useEffect(() => {
        const fetchChansons = async () => {
          const chansons = await getDocs(collection(db, 'musiques'));
          const chansonsListe = chansons.docs.map((doc) => doc.data());
          setChansonListe(chansonsListe);
          setIsPlaying(new Array(chansonsListe.length).fill(false));
          audioRefs.current = audioRefs.current.slice(0, chansonsListe.length);
        };
        fetchChansons();
      }, []);

      const handleClick = (index) => {
        const audioElement = audioRefs.current[index];
        const isPlayingCopy = [...isPlaying];
        if (audioElement.paused) {
          audioRefs.current.forEach((element) => element.pause());
          isPlayingCopy.fill(false);
          audioElement.play();
        //   setShow(true);
          isPlayingCopy[index] = true;
        } else {
            audioElement.pause();
            // setShow(false);
            isPlayingCopy[index] = false;
        }
        setIsPlaying(isPlayingCopy);
      };

      const handleAddChanson = (index) => {
        if (!isAdded) {
          setIsAdded(true);
        } else {
          setIsAdded(false);
        }
      };

    return (
        <>
            <AnimatedPage>
                <h2 className='featured-title'>Chansons en vedettes <span className='icon-music'><FontAwesomeIcon icon={faMusic} /></span></h2>
                <ul className="container">
                    {chansonsListe.map((chanson, index) => (
                        <li className="item" key={index}>
                        <img className="playlist-image" src={chanson.image} alt={chanson.namesong} />
                        <audio ref={(el) => (audioRefs.current[index] = el)} src="../SEMILOFI.mp3"></audio>
                        <button onClick={(e) => handleClick(index)} className="fa-icons-record">
                            <FontAwesomeIcon icon={isPlaying[index] ? faCirclePause : faCirclePlay} />
                        </button>
                        <button onClick={() => handleAddChanson(index)} className="fa-icons-plus">
                            <FontAwesomeIcon icon={isAdded ? faMinus : faPlus} />
                        </button>
                        <h3 className="playlist-name">{chanson.namesong}</h3>
                        </li>
                    ))}
                </ul>
            </AnimatedPage>
        </>
    );
}

export default ChansonsVedettes;