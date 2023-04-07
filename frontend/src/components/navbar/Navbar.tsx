import React from "react";
import './Navbar.css'

export default function Navbar() {
    
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
                    <a href="#" className="mobile-nav__logo">Xylium</a>
                </div>
                <div className="navbar__right">
                    <a href="#" className="navbar__link navbar__link--pink">Try</a>
                    <a href="#" className="navbar__link">Support</a>
                    <a href="#" className="navbar__link">About</a>
                </div>
            </div>
        </>
    )
}