import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SongsProvider } from "../Providers/SongProvider";
import { authContext } from "../Providers/authContext";
// import BottomNavPlayer from "../composante/BottomNavPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompactDisc,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../composante/Footer";
import "./layout.css";

const Layout = () => {
  const { user, logout } = useContext(authContext);
  // const {
  //   songs,
  //   currentAudioUrl,
  //   currentSong,
  //   tuneIsPlaying,
  //   audioRef,
  //   handleAudio,
  // } = useContext(songsContext);
  const isAdmin = user && user.email === "drtimo69@gmail.com";
  
  return (
    <>
      <SongsProvider>
        <div className="container-layout">
          <div className="container-title">
            <h1 className="title-layout">LofiTunes de :  <span className="title-name">{user.displayName}</span></h1>
            <NavLink to="/">
              <span className="fa-icon">
              <FontAwesomeIcon icon={faCompactDisc} style={{color: "#56aeff",}} />
              </span>
            </NavLink>
          </div>
          <nav id="primary-nav">
            <ul className="nav-menu">
              <li>
                <NavLink className="menu-link" to="/">
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink className="menu-link" to="/allsongs">
                  Bibliothèque publique
                </NavLink>
              </li>
              <li>
                <NavLink className="menu-link" to="/musiques">
                  Ma Bibliothèque
                </NavLink>
              </li>
              <li>
                <NavLink className="menu-link" to="/fileimport">
                  Importer une Tune
                </NavLink>
              </li>
              {isAdmin ? (
                <li>
                  <NavLink className="menu-link" to="/admin">
                    Admin
                  </NavLink>
                </li>
              ) : null}
              <li className="btn-img-profil">
                <button className="btn" onClick={logout}>
                  Déconnexion
                </button>
                <img
                  className="img-profil"
                  src={
                    user.photoURL || <FontAwesomeIcon icon={faUserAstronaut} />
                  }
                  alt={user.displayName}
                />
              </li>
            </ul>
          </nav>
        </div>
        <div className="container-outlet">
          <Outlet />
          {/* {tuneIsPlaying ? (
              <BottomNavPlayer
                currentSong={currentSong}
                tuneIsPlaying={tuneIsPlaying}
                url={currentAudioUrl}
                audioRef={audioRef}
                handleAudio={handleAudio}
              />
            ) : null} */}
        </div>
        <Footer />
      </SongsProvider>
    </>
  );
};

export default Layout;
