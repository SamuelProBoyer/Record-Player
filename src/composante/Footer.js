import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import "./footer.css";

const Footer = () => {
   
  return (
    <footer>
      <ul className="nav-menu-footer">
        <li>
          <Link className="menu-link-footer" to="/">
            Accueil
          </Link>
        </li>
        <li>
          <Link className="menu-link-footer" to="/musiques">
            Mes musiques
          </Link>
        </li>
        <li>
          <Link className="menu-link-footer" to="/playlists">
            Mes playlists
          </Link>
        </li>
        <li>
          <Link className="menu-link-footer" to="/fileimport">
            Importer mes musiques
          </Link>
        </li>
        <div className="socials">
          <li>
            <Link className="menu-link-footer" to="https://github.com/SamuelProBoyer" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
            </Link>
          </li>
          <li>
            <Link className="menu-link-footer" to="https://www.linkedin.com/in/samuel-boyer-9328601ba/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </li>
        </div>
      </ul>
    </footer>
  );
};

export default Footer;
