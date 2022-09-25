import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canSave =
        [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate("/");
            } catch (err) {
                console.error("Failed to save the post", err);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="text-center w-screen">
            <h2 className="text-2xl font-bold pt-4 mt-[25vh] md:mt-0">
                Add a New Post
            </h2>
            <form className="mt-4 pb-8 w-max mx-auto text-left md:max-w-[75vw]">
                <div>
                    <label htmlFor="postAuthor" className="text-lg font-bold">
                        Author:
                    </label>
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
                    <label htmlFor="postTitle" className="text-lg font-bold">
                        Post Title:
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                        className="w-[100%] rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="postContent" className="text-lg font-bold">
                        Content:
                    </label>
                </div>
                <div>
                    <textarea
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged}
                        className="w-[100%] h-[100px] rounded-lg"
                    />
                </div>
                <div className="text-center mt-2">
                    <button
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        className="border border-solid border-pink-600 px-2 rounded-lg text-pink-600 font-bold hover:text-white hover:bg-pink-600"
                    >
                        Save Post
                    </button>
                </div>
            </form>
        </section>
    );
};
export default AddPostForm;
