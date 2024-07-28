"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { store } from '@/redux/store'
import { hideLoader, showLoader } from "@/utils/utility";

const LayoutWrapper = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    const [baseUrl, setBaseUrl] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(location.origin)
            if (pathname === location.pathname) {
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
