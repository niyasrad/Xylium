import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppWrapperContext } from "../../AppWrapper";
import './Topbar.css'

export default function Topbar({ menu }: { menu: string }) {

    const navigate = useNavigate()
    const { handleSignOut, globalUsername, isLoggedIn } = useAppWrapperContext()
    const [mobileNavbar, setMobileNavbar] = useState(false)

    return (
        <>
            <div className="topbar">
                <span className="topbar__logo link">Xylium</span>
                <div className="topbar__navigation">
                    {
                        isLoggedIn ?
                        (
                        <>
                            <div className="topbar__nav-buttons">
                                { menu !== "home" && <Link to="../home" className="topbar__nav-button link">HOME</Link>}
                                { menu !== "card" && <Link to={`../${globalUsername}/xycard`} className="topbar__nav-button link">XYCARD</Link>}
                                { menu !== "board" && <Link to={`../dboard`} className="topbar__nav-button link">DBOARD</Link>}
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
                        </>
                        ) :
                        (
                        <>
                            <div></div>
                            <Link className="topbar__welcome" to={'/login'}>
                                TRY XYLIUM
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout link">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                            </Link>
                        </>
                        )
                    }
                </div>
                <div className="topbar__navigation-options">
                    {
                        isLoggedIn && 
                        (
                            <svg 
                                onClick={() => {
                                    handleSignOut!()
                                    navigate('/login')
                                }} 
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout--mobile link">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        )
                    }
                    
                    <svg 
                        onClick={() => {
                            setMobileNavbar(!mobileNavbar)
                        }} 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout topbar__signout--mobile link">
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
                        className="topbar__mobile-motion"
                        
                    >   
                        <div className="topbar__mobile-nav">
                            {
                                isLoggedIn ?
                                (
                                    <>
                                        { menu !== "home" && <Link to="../home" className="topbar__nav-button link">HOME</Link>}
                                        { menu !== "card" && <Link to={`../${globalUsername}/xycard`} className="topbar__nav-button link">XYCARD</Link>}
                                        { menu !== "board" && <Link to={`../dboard`} className="topbar__nav-button link">DBOARD</Link>}
                                    </> 
                                ) :
                                (
                                    <> 
                                        <Link className="topbar__welcome" to={'/login'}>
                                            TRY XYLIUM
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout link">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                        </Link>
                                    </>
                                    
                                )
                            }
                            
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}