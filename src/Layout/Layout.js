import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";
import './layout.css';


const Layout = () => {
    return (
        <>
        <div className="container-layout">
        <header>
            <h1>Record Player fait par Sam Boyer</h1>
        </header>
            <ul className="nav-menu">
                <li>
                    <Link className="menu-link" to='/'>Accueil</Link>
                </li>
                <li>
                    <Link className="menu-link" to='/'>Mes musiques</Link>
                </li>
                <li>
                    <Link className="menu-link" to='/'>Mes playlists</Link>
                </li>

                <button className="btn">
                    Deconnexion
                </button>
            </ul>
        </div>

        <div className="container-outlet">
            <Outlet />
        </div>



        
        </>
    );
};

export default Layout;