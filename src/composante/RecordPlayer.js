import "./recordPlayer.css";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import ChansonsVedettes from "./ChansonsVedettes";
import ComposanteInfoImport from "./ComposanteInfoImport";
import ConsulteMusiques from "./ConsulteMusiques";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

const RecordPlayer = () => {
  return (
    <>
      <Header />
      <h1>Accueil <span className="icon-music"><FontAwesomeIcon icon={faMusic} style={{color: "#56aeff",}} /></span></h1>
      <AnimatedPage>
        <div className="container-accueil">
          <div className="text-accueil">
            <p>
              Bienvenue dans LofiTunes, l'application web ultime pour les
              amateurs de musique lofi ! Si vous êtes passionné par les rythmes
              apaisants et les mélodies relaxantes du lofi, alors vous êtes au
              bon endroit.
            </p>
            <Link to="/musiques">
              <button className="btn">Gérer ma bibliothèque</button>
            </Link>
          </div>
        </div>
      </AnimatedPage>
      <div className="chansonsVedettes">
        <ChansonsVedettes />
      </div>
      <div className="container-accueil">
        <ComposanteInfoImport />
      </div>
      <ConsulteMusiques />
    </>
  );
};

export default RecordPlayer;
