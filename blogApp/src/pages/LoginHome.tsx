import { Link } from "react-router-dom";

export default function LoginHome() {
    function clicked() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <>
            <div className="flex flex-col gap-6 justify-center items-center">
                <Link className=" text-white" to="/blogs"> <button className=" bg-violet-900"> Enter The Blog Page </button>  </Link>
                <button className=" bg-violet-900" onClick={clicked}> Log Out </button>
            </div>

        </>
    );
}