import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import React from "react";
import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
    // retreive postId
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article className="w-screen text-center pt-4 px-2 md:w-4/6 lg:max-w-[960px] mx-auto ">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p>{post.body}</p>
            <p className="mb-4">
                <Link to={`/post/edit/${post.id}`} className="font-bold">
                    Edit This Post{" "}
                </Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default SinglePostPage;
