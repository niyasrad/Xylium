import React, { useState } from "react";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";
import { motion, useMotionValue } from "framer-motion";

import controller from '../../assets/controller.svg'

import './Landing.css'

export default function Landing() {

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (event : any) => {
        const { clientX, clientY } = event;
        x.set(clientX * 0.05)
        y.set(clientY * 0.02)
    }
    return (
        <div className="landing">
            <div className="landing__content">
                <Navbar />
                <motion.div 
                    initial={{ opacity: 0 }} 
                    whileInView={{opacity: 1}} 
                    className="landing__main"
                >
                    <div className="landing__description">
                        <h1>
                        Personalized Steam Profile Access, with achievements, games, info, much more.
                        </h1>
                        <h2 className="landing__para">
                        Xylium takes your Steam profile, transforms the data into your pleasant viewports.
                        </h2>
                        <a href="#">
                            <Button text="Try Xylium"/>
                        </a>
                    </div>
                    <motion.div 
                        onMouseMove={handleMouseMove}
                        style = {{ translateX : x, translateY : y }}
                        transition = {{ duration: 0.3, type: 'spring', ease: "easeOut" }}
                        className="landing__art"
                    >
                        <img className="landing__controller link" src={controller} alt="controller"/>
                    </motion.div>
                </motion.div>
                
            </div>
        </div>
    )
}