import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <nav id="footer-nav">
        <ul className="nav-menu-footer">
          <li>
            <NavLink className="menu-link-footer" to="/">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink className="menu-link-footer" to="/allsongs">
              Bibliothèque publique
            </NavLink>
          </li>
          <li>
            <NavLink className="menu-link-footer" to="/musiques">
              Ma Bibliothèque
            </NavLink>
          </li>
          <li>
            <NavLink className="menu-link-footer" to="/fileimport">
              Importer une Tune
            </NavLink>
          </li>
          <div className="socials">
            <li>
              <NavLink
                className="menu-link-footer"
                to="https://github.com/SamuelProBoyer"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} />
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu-link-footer"
                to="https://www.linkedin.com/in/samuel-boyer-9328601ba/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </NavLink>
            </li>
          </div>
          <span>LofiTunes fait par Samuel Boyer&copy;</span>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
