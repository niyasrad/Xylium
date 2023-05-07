import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import './DGamesBar.css'

export default function DGamesBar({ game }: { game: any })  {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {setLoading(false)}, 800);
        return () => clearTimeout(timer);
    } ,[])
    return (
        <motion.div 
            className="dg-bar link"
            initial={{ opacity: 0.2 }}
            animate={ loading ? { opacity: 0.2 } : { opacity: 1 }}
        >
            <img className="dg-bar__image" src={game.img_icon_url === "" ? "https://cdn.discordapp.com/attachments/946407954180108328/1098972496453173389/sport.png" : "https://cdn.akamai.steamstatic.com/steam/apps/" + game.appid + "/header.jpg" } alt={game.name + " icon"}/>
            <div className="dg-bar__info">
                <div className="dg-bar__i-title">
                    {game.name}
                </div>
                <div className="dg-bar__i-playtime">
                    <span>PLAYTIME</span>
                    <span className="dg-bar__i-mins">{game.playtime_forever} Minutes</span>
                </div>
            </div>
        </motion.div>
    )
}