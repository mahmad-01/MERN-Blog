import { Link } from "react-router-dom";
import Login from "./Login";
export default function Home() {
    function clicked() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <>
            <div className="flex flex-col">
                <Link to="/login"> Login </Link>
                <Link to="/blogs"> Blogs </Link>
                <button onClick={clicked}> Log Out </button>
            </div>

        </>
    );
}