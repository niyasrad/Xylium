import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import '../sign.css'

export default function SignUp() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [steamID, setSteamID] = useState<string>('')


    return (
        <div className="sign">
            <div className="sign__content">
                <div className="sign__info">
                    <h1>Xylium</h1>
                    <h2>Create an Account</h2>
                </div>
                <div className="sign__fields">
                    <div className="sign__button">
                        <div className="sign__field-screen"></div>
                        <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="sign__button">
                        <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        <div className="sign__field-screen"></div>
                    </div>
                    <div  className="sign__button">
                        <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter SteamID" onChange={(e) => setSteamID(e.target.value)} />
                        <div className="sign__field-screen"></div>
                    </div>
                </div>
                <div className="sign__submit">
                    <p className="sign__submit-text">Already have an account? <Link to="/login" className="sign__submit-text--pink">Log in</Link></p>
                    <Button text="Sign up"/>
                </div>
            </div>
        </div>
    )
}