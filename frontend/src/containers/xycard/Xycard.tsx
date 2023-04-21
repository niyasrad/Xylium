import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Profilebar from "../../components/profilebar/Profilebar";
import Topbar from "../../components/topbar/Topbar";
import './Xycard.css'


export default function Xycard() {

    const { user }= useParams()
    const [userData, setUserData] = useState({
        games: [],
        total2weekplay: 0
    })

    useEffect(() => {
        axios.get('https://xylium.onrender.com/user/recent')
        .then((res) => {
            setUserData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="xycard">
            <Topbar />
            <motion.div 
                className="xycard__content"
                initial={{ opacity: 0 }} 
                whileInView={{opacity: 1}} 
            >
                <div className="xycard__games">
                    <div className="xycard__top-info">
                        <span className="xycard__heading">Xylium</span>
                        <Profilebar username={user ? user: 'tester'}/>
                    </div>
                    <div className="xycard__information">
                        <div className="xycard__games-list">
                        {
                            userData.games.slice(0,2).map((game: any) => (
                                <div className="xycard__recent-game">
                                    <img className="xycard__recent-image" src={game.img_icon_url === "" ? "https://cdn.discordapp.com/attachments/946407954180108328/1098972496453173389/sport.png" : "https://cdn.akamai.steamstatic.com/steam/apps/" + game.appid + "/header.jpg"}  alt={game.name} />
                                    <span className="xycard__hours-put">{game.playtime_2weeks} Minutes</span>
                                </div>
                            ))
                        }
                        </div>
                        <div className="xycard__diagnosis">
                            <span className="xycard__dia-intro">
                                You played, in the last two weeks  for over,
                            </span>
                            <span className="xycard__dia-timings">{userData.total2weekplay} Minutes</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}