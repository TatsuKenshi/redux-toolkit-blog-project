import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map((user) => (
        <li key={user.id} className="mb-4 text-pink-600">
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ));

    return (
        <section className="w-screen text-center pt-4 px-2 md:w-4/6 lg:max-w-[960px] mx-auto ">
            <h2 className="text-2xl font-bold mb-2">Users</h2>

            <ul>{renderedUsers}</ul>
        </section>
    );
};

export default UsersList;
