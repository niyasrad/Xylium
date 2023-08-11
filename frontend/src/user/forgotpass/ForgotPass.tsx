import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import { useEffect, useState } from "react"
import { useAppWrapperContext } from "../../AppWrapper"
import axios from "axios"
import Loading from "../../components/loading/Loading"

export default function ForgotPass() {

    const [email, setEmail] = useState<string>('')
    const [errMessage, setErrMessage] = useState<string>('')
    const { isLoggedIn, openSnackbar } = useAppWrapperContext()
    
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [])

    const handleSubmit = () => {

        if (!email) {
            openSnackbar!({
                message: "Please enter an E-mail Address!",
                type: "warning"
            })
            return
        }
    
        setLoading(true)
        setErrMessage('')

        axios.post(import.meta.env.VITE_BASE_API + '/api/forgotpassword', { email })
        .then((res) => {
            openSnackbar!({
                message: res.data.message,
                type: "success"
            })
            setEmail('')
        })
        .catch((err) => {
            openSnackbar!({
                message: err.response.data.message,
                type: "error"
            })
            setErrMessage(err.response.data.message)
        })
        .finally(() => setLoading(false))

    }
    
    return (
        <div className="sign">
            {
                loading &&
                (
                    <div className="sign__loading">
                        <Loading />
                    </div>
                )
            }
            <div className="sign__content">
                <div className="sign__info">
                    <div className="sign__heading">Xylium</div>
                    <div className="sign__description">Forgot Password?</div>
                </div>
                <div className="sign__fields">
                    <div className="sign__button">
                        <div className="sign__field-screen"></div>
                        <motion.input whileFocus={{ scale: 1.1 }} value={email} className="sign__field" type="text" placeholder="Enter E-mail" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="sign__submit">
                    <div className="sign__error">
                        {errMessage}
                    </div>
                    <p className="sign__submit-text">Did your remember it? <Link to="/login" className="sign__submit-text--pink">Log In</Link></p>
                    <motion.div>
                        <Button text="Request Change" onClick={handleSubmit}/>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}