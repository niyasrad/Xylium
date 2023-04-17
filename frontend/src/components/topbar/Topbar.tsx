import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAppWrapperContext } from "../../AppWrapper";
import './Topbar.css'

export default function Topbar() {

    const navigate = useNavigate()
    const { handleSignOut, globalUsername } = useAppWrapperContext()
    const [mobileNavbar, setMobileNavbar] = useState(false)

    return (
        <>
            <div className="topbar">
                <span className="topbar__logo link">Xylium</span>
                <div className="topbar__navigation">
                    <div className="topbar__nav-buttons">
                        <span className="topbar__nav-button link">XYCARD</span>
                        <span className="topbar__nav-button link">DBOARD</span>
                    </div>       
                    <span className="topbar__welcome">Welcome, {globalUsername}
                        <svg 
                            onClick={() => {
                                handleSignOut!()
                                navigate('/login')
                            }} 
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout link">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </span>
                </div>
                <div className="topbar__navigation-options">
                    <svg 
                        onClick={() => {
                            handleSignOut!()
                            navigate('/login')
                        }} 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout--mobile link">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <svg 
                        onClick={() => {
                            setMobileNavbar(!mobileNavbar)
                        }} 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="home__signout home__signout--mobile link">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                </div>
            </div>
            <AnimatePresence>
                {
                    mobileNavbar &&
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto'}}
                        exit={{ opacity: 0, height: 0 }}
                        className="home__mobile-motion"
                        
                    >   
                        <div className="topbar__mobile-nav">
                            <span className="topbar__nav-button">XYCARD</span>
                            <span className="topbar__nav-button">DBOARD</span>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}