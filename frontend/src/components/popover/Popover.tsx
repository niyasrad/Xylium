import { useEffect, useState } from "react";
import OptButton from "../optbutton/OptButton";
import { motion } from "framer-motion"
import './Popover.css'
import { useAppWrapperContext } from "../../AppWrapper";
import axios from "axios";
import { useNavigate } from "react-router";

export enum Actions {
    del = "DELETE",
    email = "SAVE",
    pass = "CHANGE"
}

export interface PopoverProps {
    label: string;
    operation: Actions;
    onComplete?: () => void;
    onCancel?: () => void;
}

export default function Popover({ label, operation, onComplete, onCancel }: PopoverProps) {

    const [inputValue, setInputValue] = useState<string>('')
    const { openSnackbar, handleSignOut } = useAppWrapperContext()

    const navigate = useNavigate()

    const handleSubmit = () => {
        if (!inputValue) {
            openSnackbar!({
                message: "Please enter a valid value",
                type: "warning"
            })
            return
        }

        if (operation === Actions.email) {

            const emailTest = !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue))

            if (emailTest) {
                openSnackbar!({
                    message: "Please Enter a valid E-mail!",
                    type: "error"
                })
                return
            }

            axios.post(import.meta.env.VITE_BASE_API + '/settings/change', {
                email: inputValue
            })
            .then((res) => {
                openSnackbar!({
                    message: res.data.message,
                    type: "success"
                })
                onComplete!()
            })
            .catch((err) => {
                openSnackbar!({
                    message: err.response.data.message,
                    type: "error"
                })
            })

        } else if (operation === Actions.pass) {

            if (inputValue.length < 5) {
                openSnackbar!({
                    message: "Password needs to be longer than 4 Characters!",
                    type: "error"
                })
                return
            }

            axios.post(import.meta.env.VITE_BASE_API + '/settings/change', {
                password: inputValue
            })
            .then((res) => {
                openSnackbar!({
                    message: res.data.message,
                    type: "success"
                })
                onComplete!()
            })
            .catch((err) => {
                openSnackbar!({
                    message: err.response.data.message,
                    type: "error"
                })
            })

        } else if (operation === Actions.del) {

            if (inputValue.toUpperCase() !== "DELETE") {
                openSnackbar!({
                    message: "Please type in DELETE to confirm!",
                    type: "warning"
                })
                return
            }
            axios.post(import.meta.env.VITE_BASE_API + '/settings/delete')
            .then((res) => {
                openSnackbar!({
                    message: res.data.message,
                    type: "success"
                })
                handleSignOut!()
                navigate('/login')
            })
            .catch((err) => {
                openSnackbar!({
                    message: err.response.data.message,
                    type: "error"
                })
            })

        } else {
            openSnackbar!({
                message: "Invalid Operation!",
                type: "warning"
            })
        }
    }

    useEffect(() => {
        
        const popkey = (event: any) => {
            if (event.key === 'Enter') {
                handleSubmit()
            } else if (event.key === 'Escape') {
                onCancel!()
            }
        }

        document.addEventListener('keydown', popkey)

        return () => {
            document.removeEventListener('keydown', popkey)
        }
        
    }, [inputValue])

    return (
        <div 
            className="popover"
            onClick={onCancel}
        >
            <div className="popover__bg"></div>
            <motion.div 
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.1
                }}
                exit={{ opacity: 0, y: -100}}
                className="popover__content"
            >
                <span className="popover__label">{label}</span>
                <input 
                    autoFocus={true}
                    className="popover__input" 
                    placeholder="Type Here" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="popover__complete">
                    <OptButton 
                        text="CANCEL"
                        onClick={onCancel}
                        isDelete={true}
                    />
                    <OptButton 
                        text={operation}
                        onClick={handleSubmit}
                    />
                </div>
            </motion.div>
        </div>
    )
}