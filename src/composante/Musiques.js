import './musiques.css';     
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';


const Musiques = () => {
  return (
    <>
      <h1>Mes musiques</h1>
      <ul className="container">
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
        <li className="item">
          <img
            className="playlist-image"
            src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
            alt="lofi"
          />
          <button className='fa-icons-record'><FontAwesomeIcon icon={faCirclePlay} /></button>
          <h3 className="playlist-name">Chanson 1</h3>
        </li>
      </ul>
    </>
  );
};

export default Musiques;
