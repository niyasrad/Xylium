import React from "react";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";

import controller from '../../assets/controller.svg'

import './Landing.css'

export default function Landing() {
    return (
        <div className="landing">
            <div className="landing__content">
                <Navbar />
                <div className="landing__main">
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
                    <div className="landing__art">
                        <img className="landing__controller" src={controller} alt="controller"/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}