import React, { useState } from "react";
import './Navbar.css'

export default function Navbar() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleOpen = () => setSidebarOpen(true)

    return (
        <>
            <div className="navbar">
                <div className="navbar__left">
                    <a href="#" className="navbar__logo">Xylium</a>
                </div>
                <div className="navbar__right">
                    <a href="#" className="navbar__link navbar__link--pink">Try</a>
                    <a href="#" className="navbar__link">Support</a>
                    <a href="#" className="navbar__link">About</a>
                </div>
            </div>
            <div className="mobile-nav">
                <div className="mobile-nav__center">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleOpen} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="mobile-nav__open">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                    <a href="#" className="mobile-nav__logo">Xylium</a>
                </div>
                {
                    sidebarOpen &&
                    (
                        <div className="navbar__right">
                            <a href="#" className="navbar__link navbar__link--pink">Try</a>
                            <a href="#" className="navbar__link">Support</a>
                            <a href="#" className="navbar__link">About</a>
                        </div>
                    )
                }
                
            </div>
        </>
    )
}