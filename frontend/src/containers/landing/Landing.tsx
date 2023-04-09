import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";
import { motion, useMotionValue } from "framer-motion";

import controller from '../../assets/controller.svg'

import './Landing.css'
import { Link } from "react-router-dom";

export default function Landing() {

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (event : any) => {
        const { clientX, clientY } = event;
        x.set(clientX * 0.05)
        y.set(clientY * 0.02)
    }

    useEffect(() => {
        fetch('http://localhost:8080/server')
        .then((res) => console.log(res))
    }, [])
    
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
                        <div className="landing__heading">
                        Personalized Steam Profile Access, with achievements, games, info, much more.
                        </div>
                        <div className="landing__para">
                        Xylium takes your Steam profile, transforms the data into your pleasant viewports.
                        </div>
                        <Link to="/login">
                            <Button text="Try Xylium"/>
                        </Link>
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