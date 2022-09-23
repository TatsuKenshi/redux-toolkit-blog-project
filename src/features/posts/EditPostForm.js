import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState("idle");

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(Number(e.target.value));

    const canSave =
        [title, content, userId].every(Boolean) && requestStatus === "idle";

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(
                    updatePost({
                        id: post.id,
                        title,
                        body: content,
                        userId,
                        reactions: post.reactions,
                    })
                ).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate(`/post/${postId}`);
            } catch (error) {
                console.error("Failed to save the post", error);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const usersOptions = users.map((user) => {
        return (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        );
    });

    const onDeletePostClicked = () => {
        try {
            setRequestStatus("pending");
            dispatch(deletePost({ id: post.id })).unwrap();

            setTitle("");
            setContent("");
            setUserId("");
            navigate("/");
        } catch (error) {
            console.log("Failed to delete the post", error);
        } finally {
            setRequestStatus("idle");
        }
    };

    return (
        <section className="text-center w-screen">
            <h2 className="text-2xl font-bold pt-4 mt-[25vh] md:mt-0">
                Edit Post
            </h2>
            <form className="mt-4 pb-8 w-max mx-auto text-left md:max-w-[75vw]">
                <div>
                    <label htmlFor="postTitle">Post Title: </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                        className="border border-solid border-black"
                    />
                </div>
                <div>
                    <label htmlFor="postAuthor">Author: </label>
                </div>
                <div>
                    <select
                        id="postAuthor"
                        value={userId}
                        onChange={onAuthorChanged}
                    >
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor="postContent">Content: </label>
                </div>
                <div>
                    <textarea
                        name="postContent"
                        id="postContent"
                        value={content}
                        onChange={onContentChanged}
                        className="border border-solid border-black"
                    ></textarea>
                </div>
                <div className="flex justify-around">
                    <button
                        type="button"
                        disabled={!canSave}
                        onClick={onSavePostClicked}
                        className="border border-solid border-pink-600 px-2 rounded-lg text-pink-600 font-bold hover:text-white hover:bg-pink-600"
                    >
                        Save Post
                    </button>
                    <button
                        type="button"
                        onClick={onDeletePostClicked}
                        className="border border-solid border-pink-600 px-2 rounded-lg text-pink-600 font-bold hover:text-white hover:bg-pink-600"
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditPostForm;
