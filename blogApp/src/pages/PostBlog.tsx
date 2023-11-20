import { useNavigate } from "react-router-dom";

export default function PostBlog() {
    const navigate = useNavigate();
    return (
        <>
            <div> Post a Blog! </div>
            <button className=" bg-violet-900" onClick={() => { navigate("/blogs") }}> Go Back </button >
        </>
    );
}