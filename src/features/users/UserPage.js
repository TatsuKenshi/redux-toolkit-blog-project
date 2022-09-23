import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, Number(userId)));

    const postsForUser = useSelector((state) =>
        selectPostsByUser(state, Number(userId))
    );

    const postTitles = postsForUser.map((post) => (
        <li key={post.id} className="mb-4 font-bold">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section className="w-screen text-center pt-4 px-2 md:w-4/6 lg:max-w-[960px] mx-auto ">
            <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>

            <ol>{postTitles}</ol>
        </section>
    );
};

export default UserPage;
