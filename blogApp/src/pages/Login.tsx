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
            </>
        )}
            {localStorage.auth && (
                <div className="flex flex-col gap-3 justify-center items-center">
                    You have already logged in!
                    <button className=" bg-violet-900" onClick={clicked}> Log Out </button>
                    <button className=" bg-violet-900" onClick={() => { navigate("/home") }}> Home </button >
                </div >
            )
            }
        </>
    );
}