import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex h-16 bg-slate-200 items-center justify-center">
            <h1 className="text-2xl font-bold mr-2 text-pink-600">
                Redux Blog
            </h1>
            <nav>
                <ul className="flex">
                    <li className="mr-2 text-xl">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="mr-2 text-xl">
                        <Link to="post">Post</Link>
                    </li>
                    <li className="text-xl">
                        <Link to="user">Users</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
