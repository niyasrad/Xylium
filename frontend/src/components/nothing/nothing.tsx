import { motion } from "framer-motion";
import X from '../../assets/X.svg'
import './nothing.css'

export default function Nothing ({ text }: { text: string }) {
    return (
        <div className="nothing">
            <motion.img  
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
                className="nothing__logo" 
                src={X} alt="Xylium Logo" 
            />
            <span className="nothing__heading">Owww.. Nothing to show</span>
            <span className="nothing__desc">{text}</span>
        </div>
    )
}