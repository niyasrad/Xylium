import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppWrapperContext } from "../../AppWrapper";
import Button from "../../components/button/Button";
import '../sign.css'

export default function SignUp() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [steamID, setSteamID] = useState<string>('')

    const [errMessage, setErrMessage] = useState<string>('')

    const { isLoggedIn, setIsLoggedIn, setGlobalUsername } = useAppWrapperContext()
    const navigate = useNavigate()

    const handleSubmit = () => {

        if (username.length < 3) {
            setErrMessage("Username/SteamID needs to be longer than 2 Characters!")
            return
        }
        if (password.length < 5) {
            setErrMessage("Password needs to be longer than 4 Characters!")
            return
        }
        if (steamID.length == 0) {
            setErrMessage("Please provide with the SteamID")
        }

        axios.post('https://xylium.onrender.com/api/signup', {
            username: username,
            password: password,
            steamid: steamID
        })
        .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
            setIsLoggedIn!(true)
            setGlobalUsername!(username)
            navigate('/home')
        })
        .catch((err) => {
            setIsLoggedIn!(false)
            setGlobalUsername!('')
            setErrMessage(err.response.data.message)
        })
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home', { replace: true })
        }   
    }, [isLoggedIn])

    return (
        <div className="sign">
            <div className="sign__content">
                <div className="sign__info">
                    <div className="sign__heading">Xylium</div>
                    <div className="sign__description">Create an Account</div>
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
                <div className="sign__error">
                    {errMessage}
                </div>
                <div className="sign__submit">
                    <p className="sign__submit-text">Already have an account? <Link to="/login" className="sign__submit-text--pink">Log in</Link></p>
                    <Button text="Sign up" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}