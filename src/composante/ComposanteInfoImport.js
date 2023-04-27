import React from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";

const ComposanteInfoImport = () => {
  return (
    <>
      <AnimatedPage>
        <div className="container-accueil">
          <div className="text-accueil">
            <p>
              Cette application vous permet aussi de partager vos différentes
              musiques avec différentes personnes
            </p>
            <Link to="/fileimport">
              <button className="btn">Importer une Tune</button>
            </Link>
          </div>
          <div className="img-accueil">
            <img
              src="https://cdn.pixabay.com/photo/2022/10/17/00/02/dual-7526360_960_720.jpg"
              alt="img"
            />
          </div>
        </div>
      </AnimatedPage>
    </>
  );
};

export default ComposanteInfoImport;
