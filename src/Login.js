import { useContext, useState } from "react";
import { authContext } from "./AuthContext/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import './login.css';


const Login = () => {
    const [auth, setAuth] = useState({
        email: "",
        password: ""
    });
    console.log(setAuth);

    const { login } = useContext(authContext);

    const submitHandler = async(e) => {
        e.preventDefault();
        await login(auth);
    };

    return (
        <>
        <div className="page-wrapper">
            <div className="container-login">
            <div className="fa-icon-login"><FontAwesomeIcon icon={faRecordVinyl} /></div>
                <div className="container-title-login"><h1>LofiTunes</h1></div>
                <div className="container-form">
                    <form noValidate onSubmit={submitHandler}>
                        <button className="btn-login">
                            <input type="submit" value="Connexion avec Google" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        </>
    );

 }

 export default Login;