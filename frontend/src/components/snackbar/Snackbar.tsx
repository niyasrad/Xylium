import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import './Snackbar.css'

interface SnackbarProps {
    type: "info" | "success" | "warning" | "error";
    message: string;
    isActive?: boolean;
}

export const useSnackbar = () => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [type, setType] = useState<'info' | 'warning' | 'error' | 'success'>('info')

    useEffect(() => {
        if (isActive) {
            setTimeout(() => {
                setIsActive(false)
            }, 2500)
        }
    }, [isActive])

    const openSnackbar = ({ message, type }: SnackbarProps) => {
        setIsActive(true)
        setMessage(message)
        setType(type)
    }

    return { isActive, message, openSnackbar, type }
}


export default function Snackbar({ type = 'info', message = 'This is a message', isActive } : SnackbarProps) {

    return (
        <AnimatePresence>
            {
                isActive &&
                <motion.div
                    initial={{
                        opacity: 0,
                        top: 100,
                        right: -500
                    }}
                    animate={{
                        opacity: 1,
                        right: 0
                    }}
                    exit={{
                        opacity: 0,
                        right: -500
                    }}
                    transition={{
                        type: 'spring',
                        duration: 0.8
                    }}
                    className="snackbar"
                >
                    <div className="snackbar__wrapper">
                        <div className="snackbar__prev"></div>
                        <div className="snackbar__content link">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={ type === 'info' ?
                                        '#00C2FF' : 
                                        type === 'error' ? 
                                        '#FF003D' : 
                                        type === 'success' ? 
                                        '#00FF85' :
                                        type === 'warning' ?
                                        '#FFC700' : 'currentColor'
                                } 
                                className="snackbar__icon"
                            >
                                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                            <span className="snackbar__message">{message}</span>
                        </div>
                    </div>
                </motion.div>
            }
            
        </AnimatePresence>
    )
}