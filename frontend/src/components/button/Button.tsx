import React from "react";
import './Button.css'

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <div className="button link" onClick={onClick ? onClick : () => {}}>
            <div className="button__bg"></div>
            <div className="button__front">
                <div>{text}</div>
            </div>
        </div>
    )
}