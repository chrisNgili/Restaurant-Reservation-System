import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(){
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div classname='flex-1'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}