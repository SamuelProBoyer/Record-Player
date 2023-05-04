import React from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";

const ComposanteInfoImport = () => {
  return (
    <>
      <AnimatedPage>
        <div className="container-accueil">
          <div className="text-accueil-import">
            <p>
              Cette application vous permet aussi de partager vos différentes
              musiques avec différentes personnes
            </p>
            <Link to="/fileimport">
              <button className="btn">Importer une Tune</button>
            </Link>
          </div>
          <div className="img-accueil">
            <div className="parallax-inPage"></div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default ComposanteInfoImport;
