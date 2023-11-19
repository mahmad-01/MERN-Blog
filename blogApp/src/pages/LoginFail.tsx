import { useNavigate } from "react-router-dom";


export default function LoginFail() {
    const navigate = useNavigate();
    return (
        <div>
            <p> You Failed To Login! Nice Try Buddy. </p>
            <button className=" bg-violet-900" onClick={() => { navigate("/login") }}> Try Again! </button>
        </div>
    )
}