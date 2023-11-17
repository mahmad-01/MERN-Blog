import { Link } from "react-router-dom";

export default function Blog() {
    return (
        <>
            <div className="flex flex-col gap-5 justify-center items-center">
                Blogs Page WOHOOO!
                <Link className=" text-white" to="/home"> <button className=" bg-violet-900"> Back to Home </button>  </Link>
            </div>
        </>
    );
}