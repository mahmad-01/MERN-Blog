import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface signType {
    username: string,
    password: string
};

export default function SignUp() {
    const [signInfo, setsignInfo] = useState<signType>({
        username: "",
        password: ""
    });

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    function onChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setsignInfo({ ...signInfo, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAuthenticated(true);
        console.log(signInfo);
        localStorage.auth = authenticated;
        console.log(authenticated);
        navigate("/home");

    };


    function clicked() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>{!localStorage.auth && (
            <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center">
                    <label> Username: </label>
                    <input name="username" placeholder="Username" defaultValue={signInfo.username} type="text" onChange={onChange} required></input>
                </div>
                <div className="flex flex-col justify-center">
                    <label> Password: </label>
                    <input name="password" placeholder="Password" defaultValue={signInfo.password} type="password" onChange={onChange} required></input>
                </div>
                <button type="submit"> Sign Up </button>
            </form>
        )}
            {localStorage.auth && (
                <div>
                    You have already logged in!
                    <button onClick={clicked}> Log Out </button>
                </div>
            )}
        </>
    );
}