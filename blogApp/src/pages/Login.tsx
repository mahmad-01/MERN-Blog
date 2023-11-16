import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export interface loginType {
    username: string,
    password: string
};

export default function Login() {
    const [loginInfo, setLoginInfo] = useState<loginType>({
        username: "",
        password: ""
    });
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


    function onChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAuthenticated(true);
        localStorage.auth = authenticated;
        console.log(authenticated);
        console.log(loginInfo);
        navigate("/home");
    };

    function clicked() {
        localStorage.clear();
        window.location.reload();
    }


    return (
        <>{!localStorage.auth && (
            <>
                <form className="flex flex-col justify-center gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center">
                        <label> Username: </label>
                        <input name="username" placeholder="Username" defaultValue={loginInfo.username} type="text" onChange={onChange} required></input>
                    </div>
                    <div className="flex flex-col justify-center">
                        <label> Password: </label>
                        <input name="password" placeholder="Password" defaultValue={loginInfo.password} type="password" onChange={onChange} required></input>
                    </div>
                    <button type="submit"> Log In </button>
                </form>
                <button onClick={() => { navigate("/signup") }}> Sign Up </button>
            </>
        )}
            {localStorage.auth && (
                <div className="flex flex-col justify-center">
                    You have already logged in!
                    <button onClick={clicked}> Log Out </button>
                    <button onClick={() => { navigate("/home") }}> Home </button >
                </div >
            )
            }
        </>
    );
}