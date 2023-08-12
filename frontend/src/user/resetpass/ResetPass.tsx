import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import { useEffect, useState } from "react"
import { useAppWrapperContext } from "../../AppWrapper"
import axios from "axios"
import Loading from "../../components/loading/Loading"

export default function ResetPass() {

    const [pass, setPass] = useState<string>('')
    const [confPass, setConfPass] = useState<string>('')
    const [errMessage, setErrMessage] = useState<string>('')

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const logval = searchParams.get('logval')

    const { isLoggedIn, openSnackbar } = useAppWrapperContext()
    
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [])

    const handleSubmit = () => {

        if (!pass) {
            openSnackbar!({
                message: "Please enter a password!",
                type: "warning"
            })
            setErrMessage('Please enter a password!')
            return
        }

        if (pass !== confPass) {
            openSnackbar!({
                message: "Please enter matching passwords!",
                type: "warning"
            })
            setErrMessage('Please enter matching passwords!')
            return
        }
     
        setLoading(true)
        setErrMessage('')

        axios.post(import.meta.env.VITE_BASE_API + '/api/resetpassword', { password: pass, logval })
        .then((res) => {
            openSnackbar!({
                message: res.data.message,
                type: "success"
            })
            navigate('/login')
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
                    <div className="sign__description">Set New Password</div>
                </div>
                <div className="sign__fields">
                    <div className="sign__button">
                        <div className="sign__field-screen"></div>
                        <motion.input whileFocus={{ scale: 1.1 }} value={pass} className="sign__field" type="password" placeholder="Enter Password" onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <div className="sign__button">
                        <div className="sign__field-screen"></div>
                        <motion.input whileFocus={{ scale: 1.1 }} value={confPass} className="sign__field" type="password" placeholder="Re-enter Password" onChange={(e) => setConfPass(e.target.value)}/>
                    </div>
                </div>
                <div className="sign__submit">
                    <div className="sign__error">
                        {errMessage}
                    </div>
                    <p className="sign__submit-text">Not Feeling like it? <Link to="/login" className="sign__submit-text--pink">Log In</Link></p>
                    <motion.div>
                        <Button text="Request Change" onClick={handleSubmit}/>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}