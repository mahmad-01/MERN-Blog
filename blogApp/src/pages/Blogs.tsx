import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import moment from "moment";


export default function Blog() {
    const navigate = useNavigate();
    const [gPosts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5173/api/post/getAllPosts")
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
    }, []);

    const dis = gPosts.map((post: any) => {
        return (
            <div key={post._id}>
                <Card author={post.author.username} title={post.title} content={post.content} date={moment(post.create_time).format('MMMM Do YYYY, h:mm:ss a')} category={post.category.name} />
            </div>);
    })

    return (
        <>
            <div className="flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl font-bold pb-5"> Blogs Page </h2>
                <button className="bg-violet-900 text-white px-10" onClick={() => { navigate("/postablog") }}> Post a Blog! </button>
            </div>
            <div className="flex flex-col flex-wrap gap-3 py-5">
                {dis}
            </div>
            <Link className=" text-white" to="/home"> <button className=" bg-violet-900"> Back to Home </button>  </Link>
        </>
    );
};