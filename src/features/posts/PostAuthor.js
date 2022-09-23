import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);

    const author = users.find((user) => user.id === userId);

    return (
        <span>
            by{" "}
            <span className="font-bold italic text-pink-600">
                {author ? author.name : "Unknown Author"}
            </span>
        </span>
    );
};

export default PostAuthor;
