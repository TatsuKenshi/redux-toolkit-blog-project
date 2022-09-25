import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeroImage from "./HeroImage";

import React from "react";

const Layout = () => {
    return (
        <>
            <Header />
            <HeroImage />
            <main className="bg-slate-200 min-h-screen">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
