import { useNavigate } from "react-router";
import './NotFound.css'
import X from '../../assets/X.svg'
import Button from "../../components/button/Button";
import { motion } from 'framer-motion'

export default function NotFound() {

    const navigate = useNavigate()

    return (
        <div className="not-found">
            <div className="not-found__content">
                <div className="not-found__error">
                    <div className="not-found__heading">404 Not Found</div>
                    <div className="not-found__description">This Page Does Not Exist</div>
                    <div className="not-found__prescription">Check your URL, Please check if you’ve entered the right page. Contact @Xylium-help if you cannot figure the error!</div>
                    <Button text="HOME" onClick={() => navigate('../home', { replace: true })}/>
                </div>
                <motion.div 
                    className="not-found__logo"
                    animate={{
                        y: [0, 20, 0, -20, 0],
                        scale: [1, 0.8, 1, 0.8, 1],
                        rotate: [0, 10, 0, -10, 0]
                    }}
                    transition={{
                        duration: 5.5,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    <img src={X} alt="Xylium Logo" />
                </motion.div>
            </div>
        </div>
    )
}