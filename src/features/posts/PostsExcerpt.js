import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId));

    return (
        <article className="mb-4 rounded-md p-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`} className="font-bold">
                    View This Post{" "}
                </Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
            <div className="w-inherit h-[1px] bg-black mt-4"></div>
        </article>
    );
};

export default PostsExcerpt;
