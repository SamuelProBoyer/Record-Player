import React from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
// import Spline from "@splinetool/react-spline";

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
            <div className="parallax-inPage">
            {/* <img className="img-parallax" src="./importImg.png" alt="img" /> */}
            </div>
          </div>
          {/* <Spline scene="https://prod.spline.design/P8dlKhjbHujM5uup/scene.splinecode" /> */}
        </div>
      </AnimatedPage>
    </>
  );
};

export default ComposanteInfoImport;
