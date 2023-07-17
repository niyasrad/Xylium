import { motion } from "framer-motion";
import X from '../../assets/X.svg'
import './Loading.css'

export default function Loading() {

    return (
        <div className="loading">
            <motion.div
                className="loading__spinner"
                exit={{
                    opacity: 0
                }}
                
                animate={{
                    scale: [1, 1.5, 1.5, 1, 1],
                    rotate: [0, 0, 180, 180, 360],
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity
                }}
            >
                <img src={X} alt="Loading Logo"/>   
            </motion.div>
        </div>
    )
}