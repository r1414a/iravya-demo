// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "@/components/header/Header";
import LoadingSpinner from "@/components/LoadingSpinner";


export default function AdminLayout() {
    return (
        <div className="app-container">
            {/* Navbar */}
            <Header />

            {/* Page Content */}
            <main className="">
                <Suspense fallback={<LoadingSpinner />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
}



// Your specific color palette


