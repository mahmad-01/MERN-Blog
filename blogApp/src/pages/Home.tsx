import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col gap-4">
                <p>Welcome to this secret website!</p>
                <p>Please click the button below to access the secret blog!</p>
                <button className=" bg-violet-900" onClick={() => { navigate("/login") }}> Enter at your own risk! </button>
            </div>

        </>
    );
}