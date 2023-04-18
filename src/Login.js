import { useContext, useState } from "react";
import { authContext } from "./AuthContext/authContext";


const Login = () => {
    const [auth, setAuth] = useState({
        email: "",
        password: ""
    });

    const { login } = useContext(authContext);

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("Test authentification");
        await login(auth);
    };

    return (
        <>
        <div className="container-login">
            <div className="container-title"><h1>Log in Page</h1></div>

            <div className="container-form">
                <form noValidate onSubmit={submitHandler}>
                    <button>
                        <input type="submit" value="Login" />
                    </button>

                </form>
            </div>
        </div>
        
        </>
    );

 }

 export default Login;