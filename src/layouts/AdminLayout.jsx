// layouts/AdminLayout.jsx
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import React, { memo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import Header from "@/components/header/Header";

export default function AdminLayout() {
    return (
        <div className="app-container">
            {/* <div className="flex">
                Sidebar
                <aside className="w-64 bg-primary text-white">
                    Sidebar
                </aside>

                Content
                <main className="flex-1">
                    <Outlet />
                </main>
            </div> */}

            {/* Navbar */}
            <Header/>

            {/* Page Content */}
            <main className="">
        <Outlet />
      </main>
        </div>
    );
}



// Your specific color palette


