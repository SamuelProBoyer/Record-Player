import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
// import Modal from '../Modal/Modal';
import { useEffect, useContext } from 'react';
import { authContext } from '../AuthContext/authContext';
import { collection,  getDocs } from '@firebase/firestore';
import { db } from '../config/firebase';
import "./musiques.css";


const Musiques = () => {
  const [isPlaying, setIsPlaying] = useState([]);
  const [show, setShow] = useState(false);
  const [chansonsListe, setChansonListe] = useState([]);
  const { user } = useContext(authContext);
  console.log(user);
  console.log(show);

  const audioRefs = useRef([]);

//   useEffect(() => {
//     const fetchChansons = async () => {
//       const chansons = await getDocs(collection(db, 'musiques'));
//       const chansonsListe = chansons.docs.map((doc) => doc.data());
//       setChansonListe(chansonsListe);
//       setIsPlaying(new Array(chansonsListe.length).fill(false));
//       audioRefs.current = audioRefs.current.slice(0, chansonsListe.length);
//     };
//     fetchChansons();
//   }, []);



 
    // useEffect(() => {
    //     const getCol = async() => {
    //         const maCol = await getDocs(collection(db, "users"));
    //         const documents = maCol.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id
    //         }));
    //         // console.log(documents[0].chansons);
    //         setChansonListe(documents[0].chansons);
    //     };
    //     getCol();
    // },[]);

  const handleClick = (index) => {
    const audioElement = audioRefs.current[index];
    const isPlayingCopy = [...isPlaying];
    if (audioElement.paused) {
      audioRefs.current.forEach((element) => element.pause());
      isPlayingCopy.fill(false);
      audioElement.play();
      setShow(true);
      isPlayingCopy[index] = true;
    } else {
        audioElement.pause();
        setShow(false);
        isPlayingCopy[index] = false;
    }
    setIsPlaying(isPlayingCopy);
  };

  return (
    <>
      <AnimatedPage>
        <div className="title-ari-container">
          <h1>Mes musiques</h1>
          <p>
            <Link to="/">Accueil</Link> / <span>Musiques</span>
          </p>
        </div>
        <ul className="container">
        
        </ul>
        <div className="modal-container">
          {/* <Modal show={show} onClose={() => setShow(false)} /> */}
        </div>
      </AnimatedPage>
    </>
  );
};

export default Musiques;
