import { useState } from "react";
import OptButton from "../optbutton/OptButton";
import { motion } from "framer-motion"
import './Popover.css'

export enum Actions {
    del = "DELETE",
    save = "SAVE"
}

export interface PopoverProps {
    label: string;
    operation: Actions;
    onComplete: () => void;
    onCancel?: () => void;
}

export default function Popover({ label, operation, onComplete, onCancel }: PopoverProps) {

    const [inputValue, setInputValue] = useState<string>('')

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
                        onClick={onComplete}
                    />
                </div>
            </motion.div>
        </div>
    )
}