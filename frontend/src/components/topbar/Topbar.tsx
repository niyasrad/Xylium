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
                                    onClick={() => navigate('/settings')}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="topbar__signout link">
                                    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                                    <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                                    <path fillRule="evenodd" d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
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
                            <>
                                <svg 
                                    onClick={() => navigate('/settings')}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="topbar__signout--mobile link">
                                    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                                    <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                                    <path fillRule="evenodd" d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                                <svg 
                                    onClick={() => {
                                        handleSignOut!()
                                        navigate('/login')
                                    }} 
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="topbar__signout--mobile link">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                            </>
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