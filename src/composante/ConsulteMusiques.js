import React from "react";
import { Link } from "react-router-dom";

const ConsulteMusiques = () => {
  return (
    <>
      <div className="container-musiques">
        <div className="text-accueil">
          <p>Consulté toutes les Tunes</p>
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
