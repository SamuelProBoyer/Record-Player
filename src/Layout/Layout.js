import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { SongsProvider } from "../Providers/SongProvider";
import { authContext } from "../Providers/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRecordVinyl,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../composante/Footer";
import "./layout.css";
// import BottomNavPlayer from "../composante/BottomNavPlayer";

const Layout = () => {
  const { user, logout } = useContext(authContext);
  // const { songs } = useContext(songsContext);

  return (
    <>
      <SongsProvider>
        <div className="container-layout">
          <div className="container-title">
            <h1 className="title-layout">LofiTunes de {user.displayName}</h1>
            <Link to="/">
              <span className="fa-icon">
                <FontAwesomeIcon icon={faRecordVinyl} />
              </span>
            </Link>
          </div>
          <ul className="nav-menu">
            <li>
              <Link className="menu-link" to="/">
                Accueil
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/allsongs">
                Toutes les Tunes
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/musiques">
                Ma Bibliothèque
              </Link>
            </li>
            <li>
              <Link className="menu-link" to="/fileimport">
                Importer une Tune
              </Link>
            </li>

            <li className="btn-img-profil">
              <button className="btn" onClick={logout}>
                Déconnexion
              </button>
              <img
                className="img-profil"
                src={
                  user.photoURL === undefined ? (
                    <FontAwesomeIcon icon={faUserAstronaut} />
                  ) : (
                    user.photoURL
                  )
                }
                alt={user.displayName}
              />
            </li>
          </ul>
        </div>
        {/* <Header /> */}
        <div className="container-outlet">
          <Outlet />
          {/* <BottomNavPlayer songs={songs}/> */}
        </div>
        <Footer />
      </SongsProvider>
    </>
  );
};

export default Layout;
