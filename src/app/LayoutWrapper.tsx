"use client";
import React, { useEffect, useState } from "react";
// import "./index.css";
// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from '@/redux/store'
import { debounce, hideLoader, showLoader } from "@/utils/utility";
// import { useDispatch, useSelector } from "react-redux";
// import { handleGetUserDataAdminRequest } from "@/redux/actions-reducers/auth/admin/adminAuth";

const LayoutWrapper = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    // const dispatch = useDispatch();
    const pathname = usePathname();
    const [baseUrl, setBaseUrl] = useState("");
    // const [isLogin, setIsLogin] = useState(false);

    // const debounceHandler = debounce(() => {
    //     if (typeof window !== "undefined") {
    //         const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
    //         const userType = localStorage.getItem("userType");
    //         if (isLoggedIn === true) {
    //             if (userType === "admin") {
    //                 dispatch(handleGetUserDataAdminRequest());
    //             }
    //         }
    //     }
    // }, 500);

    // useEffect(() => {
    //     debounceHandler();
    // }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(location.origin)
            // const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
            // if (isLoggedIn === true) {
            //     setIsLogin(true)
            // }
            if (pathname === location.pathname) {
                //   if (pathname.includes("auth/login") === true || pathname.includes("auth/signup") === true) {
                //       if (isLoggedIn === true) {
                //           location.replace("/")
                //       }
                //   }

                //   if (pathname === "/") {
                //       if (isLoggedIn === false) {
                //           location.replace("/auth/login/client")
                //       }
                //   }
                hideLoader()
            } else {
                showLoader()
            }
        }
    }, [pathname])
    return (
        <>
            <Provider store={store}>
                {children}
            </Provider>


            <div id="globalLoader" className="fixed z-[9999] top-1/2 left-1/2 bg-white w-full h-full flex justify-center items-center">
                <div className="flex justify-center items-center h-screen">
                    <img src={`${baseUrl}/loading.gif`} alt="loading image" />
                </div>
            </div>


            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
};

export default LayoutWrapper;
