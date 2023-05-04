import { useContext, useState } from "react";
import { authContext } from "./Providers/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Login = () => {
  const [auth] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(auth);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="container-login">
          <div className="fa-icon-login">
          <FontAwesomeIcon icon={faCompactDisc} style={{color: "#56aeff",}} />
          </div>
          <div className="container-title-login">
            <h1>Bienvenue dans LofiTunes</h1>
          </div>
          <div className="container-form">
            <form noValidate onSubmit={submitHandler}>
              <button className="btn-login">
                <input type="submit" value="Connexion avec Google" />
              </button>
            </form>
          </div>
          <span>LofiTunes fait par Samuel Boyer&copy;</span>
        </div>
      </div>
    </>
  );
};

export default Login;
