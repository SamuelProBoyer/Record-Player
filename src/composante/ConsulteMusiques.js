import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const ConsulteMusiques = () => {
  return (
    <>
      <div className="container-musiques">
        <div className="text-accueil">
          <p>
            Consulté toutes les Tunes{" "}
            <span className="icon-music">
              <FontAwesomeIcon icon={faMusic} style={{ color: "#56aeff" }} />
            </span>
          </p>
        </div>
        <div className="link-musiques">
          <Link to="/allsongs">
            <button className="btn">Voir la bibliothèque publique</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConsulteMusiques;
