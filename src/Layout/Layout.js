import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
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
  const isAdmin = user && user.email === "drtimo69@gmail.com";
  // const { songs } = useContext(songsContext);
  // console.log(songs);

  return (
    <>
      <SongsProvider>
        <div className="container-layout">
          <div className="container-title">
            <h1 className="title-layout">LofiTunes de {user.displayName}</h1>
            <NavLink to="/">
              <span className="fa-icon">
                <FontAwesomeIcon icon={faRecordVinyl} />
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
          </nav>
        </div>
        {/* <Header /> */}
        <div className="container-outlet">
          <Outlet />
          {/* <BottomNavPlayer /> */}
        </div>
        <Footer />
      </SongsProvider>
    </>
  );
};

export default Layout;
