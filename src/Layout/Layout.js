import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { authContext } from "../AuthContext/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import Footer from "../composante/Footer";
import Header from "../composante/Header";
import './layout.css';


const Layout = () => {

    const { user } = useContext(authContext);

    const { logout } = useContext(authContext);


    return (
        <>
            <div className="container-layout">
                <div className="container-title">
                    <h1 className="title-layout">LofiTunes de  {user.displayName}</h1>
                    <Link to="/">
                        <span className="fa-icon"><FontAwesomeIcon icon={faRecordVinyl} /></span>
                    </Link>
                </div>
                <ul className="nav-menu">
                    <li>
                        <Link className="menu-link" to='/'>Accueil</Link>
                    </li>
                    <li>
                        <Link className="menu-link" to='/musiques'>Mes musiques</Link>
                    </li>
                    <li>
                        <Link className="menu-link" to='/playlists'>Mes playlists</Link>
                    </li>
                    <li>
                        <Link className="menu-link" to='/fileimport'>Importer mes musiques</Link>
                    </li>

                    <li className="btn-img-profil">
                        <button className="btn" onClick={logout}>
                            Déconnexion
                        </button>
                        <img className="img-profil" src={user.photoURL === undefined ? <FontAwesomeIcon icon={faUserAstronaut} /> : user.photoURL} alt={user.displayName} />
                    </li>
                </ul>
            </div>
            <Header />
            <div className="container-outlet">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Layout;