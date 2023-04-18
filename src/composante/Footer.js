import { Link } from "react-router-dom";
import './footer.css';

const Footer = () => {
    return (
        <footer>
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
        </footer>
    );
};

export default Footer;