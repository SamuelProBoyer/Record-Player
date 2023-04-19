import "./playlists.css";
import { Link } from "react-router-dom";
import AnimationPage from "./AnimatedPage";


const Playlists = () => {
    return (
        <>
        <AnimationPage>
          <div className="title-ari-container">
          <h1 className="playlists-title">Mes playlists</h1>
          <p><Link to="/">Accueil</Link> / <span>Playlists</span></p>
                </div>
          <ul className="container-playlists">
            <li className="item">
              <img
                className="playlist-image"
                src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                alt="lofi"
              />
              <h3 className="playlist-name">Playlist 1</h3>
            </li>
            <li className="item">
              <img
                className="playlist-image"
                src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                alt="lofi"
              />
              <h3 className="playlist-name">Playlist 1</h3>
            </li>
            <li className="item">
              <img
                className="playlist-image"
                src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                alt="lofi"
              />
              <h3 className="playlist-name">Playlist 1</h3>
            </li>
          </ul>
        </AnimationPage>
      </>
    );
}

export default Playlists;