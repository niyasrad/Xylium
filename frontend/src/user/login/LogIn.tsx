import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import '../sign.css'

export default function LogIn() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <div className="sign">
            <div className="sign__content">
                <div className="sign__info">
                    <h1>Xylium</h1>
                    <h2>Log into Account</h2>
                </div>
                <div className="sign__fields">
                    <div className="sign__button">
                        <div className="sign__field-screen"></div>
                        <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter Username/SteamID" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="sign__button">
                        <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        <div className="sign__field-screen"></div>
                    </div>
                </div>
                <div className="sign__submit">
                    <p className="sign__submit-text">Don't have an account? <Link to="/signup" className="sign__submit-text--pink">Sign up</Link></p>
                    <Button text="Log in"/>
                </div>
            </div>
        </div>
    )
}