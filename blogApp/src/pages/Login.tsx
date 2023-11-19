import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(loginInfo);
        const data = { username: loginInfo.username, password: loginInfo.password };
        const verif = await axios.post("http://localhost:5173/api/user/log-in/", data)
        if (verif) {
            setAuthenticated(true);
            console.log(authenticated);
            localStorage.auth = authenticated;
            navigate("/home");
        }
        else {
            navigate("/loginfail");
        }


    };

    function clicked() {
        localStorage.clear();
        window.location.reload();
    }


    return (
        <div>{!localStorage.auth && (
            <div>
                <div className="flex flex-col gap-3 justify-center items-center">
                    <form className="flex flex-col justify-center gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center">
                            <label> Username: </label>
                            <input className="p-2 border-1 border-black rounded-md" name="username" placeholder="Username" defaultValue={loginInfo.username} type="text" onChange={onChange} required></input>
                        </div>
                        <div className="flex flex-col justify-center">
                            <label> Password: </label>
                            <input className="p-2 border-1 border-black rounded-md" name="password" placeholder="Password" defaultValue={loginInfo.password} type="password" onChange={onChange} required></input>
                        </div>
                        <button className=" bg-violet-900" type="submit"> Log In </button>
                    </form>
                    <div className="py-10 flex flex-col gap-3">
                        <button className=" bg-violet-900" onClick={() => { navigate("/signup") }}> Sign Up </button>
                        <button className=" bg-violet-900" onClick={() => { navigate("/") }}> Go Back </button>
                    </div>
                </div>
            </div>
        )}
            {localStorage.auth && (
                <div className="flex flex-col gap-3 justify-center items-center">
                    You have already logged in!
                    <button className=" bg-violet-900" onClick={clicked}> Log Out </button>
                    <button className=" bg-violet-900" onClick={() => { navigate("/home") }}> Home </button >
                </div >
            )
            }
        </div>
    );
}