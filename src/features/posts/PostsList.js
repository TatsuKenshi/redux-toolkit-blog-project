import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const orderedPostIds = useSelector(selectPostIds);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        content = orderedPostIds.map((postId) => (
            <PostsExcerpt key={postId} postId={postId} />
        ));
    } else if (postsStatus === "failed") {
        content = <p>{error}</p>;
    }

    return (
        <section className="w-screen text-center pt-4 px-2 md:w-4/6 lg:max-w-[960px] mx-auto ">
            <h2 className="text-2xl font-bold mb-2">All Posts</h2>
            <p className="mb-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Pariatur suscipit quos quo magni non dolorum, consectetur quia,
                dolorem exercitationem voluptatem ab labore animi enim tenetur.
                Aperiam nisi iusto eligendi numquam dolorem suscipit ad
                adipisci? Provident ipsam, accusantium id earum beatae nostrum
                odio fugit rerum, iure consequuntur ea maxime sit voluptatibus.
            </p>
            {content}
        </section>
    );
};

export default PostsList;
