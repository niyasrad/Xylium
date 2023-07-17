import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppWrapperContext } from "../../AppWrapper";
import Button from "../../components/button/Button";
import '../sign.css'

export default function SignUp() {

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [steamID, setSteamID] = useState<string>('')

    const [step, setStep] = useState<number>(0)

    const [errMessage, setErrMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { isLoggedIn, setIsLoggedIn, openSnackbar, setGlobalUsername } = useAppWrapperContext()
    
    useEffect(() => {
        if (errMessage !== '') {
            openSnackbar!({
                message: errMessage,
                type: "error"
            })
        }
    }, [errMessage])
    
    const navigate = useNavigate()

    const handleSubmit = async () => {
        
        setErrMessage('')

        if (username.length < 3) {
            setErrMessage("Username needs to be longer than 2 Characters!")
            return
        }
        if (username.length > 20) {
            setErrMessage("Username needs to be lesser than 21 Characters!")
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setErrMessage("Please enter a proper E-mail")
            return
        }

        if (step == 0) {
            setStep(1)
            return
        }

        if (!(/^\w+$/.test(username))) {
            setErrMessage("Username must not contain special Characters!")
            return
        }
        if (password.length < 5) {
            setErrMessage("Password needs to be longer than 4 Characters!")
            return
        }
        if (steamID.length == 0) {
            setErrMessage("Please provide with the SteamID")
            return
        }

        setLoading(true)

        await axios.get(import.meta.env.VITE_BASE_API + '/api/checksteamauth', { 
            params : {
                steamid: steamID
            }
        })
        .then((res) => {
            axios.post(import.meta.env.VITE_BASE_API + '/api/signup', {
                username: username,
                email: email,
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
        })
        .catch((err) => {
            setIsLoggedIn!(false)
            setGlobalUsername!('')
            setErrMessage(err.response.data.message)
        })
        .finally(() => {
            setLoading(false)
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
                    {
                        step === 0 ?
                        (
                            <>
                            <div className="sign__button">
                                <div className="sign__field-screen"></div>
                                <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className="sign__button">
                                <div className="sign__field-screen"></div>
                                <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="email" placeholder="Enter E-mail" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            </>
                        ) :
                        (
                            <>
                            <div className="sign__button">
                                <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                <div className="sign__field-screen"></div>
                            </div>
                            <div  className="sign__button">
                                <motion.input whileFocus={{ scale: 1.1 }} className="sign__field" required type="text" placeholder="Enter SteamID" onChange={(e) => setSteamID(e.target.value)} />
                                <div className="sign__field-screen"></div>
                            </div>
                            </>
                        )
                    }
                    
                    
                </div>
                <div className="sign__error">
                    {errMessage}
                </div>
                <div className="sign__submit">
                    <p className="sign__submit-text">Already have an account? <Link to="/login" className="sign__submit-text--pink">Log in</Link></p>
                    <motion.div
                        animate={
                            loading? {
                                opacity: 0.3
                            } : {
                                opacity: 1
                            }
                        }
                    >
                        <Button text={step === 0 ? "Next" : "Sign up"} onClick={loading ? () => {} : handleSubmit}/>
                    </motion.div>
                    
                </div>
            </div>
        </div>
    )
}