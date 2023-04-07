import React from "react";
import './Button.css'

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    return (
        <div className="button">
            <div className="button__bg"></div>
            <div className="button__front">
                <h2>{text}</h2>
            </div>
        </div>
    )
}