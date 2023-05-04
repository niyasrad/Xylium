import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/button/Button";
import Loading from "../../components/loading/Loading";
import Profilebar from "../../components/profilebar/Profilebar";
import Topbar from "../../components/topbar/Topbar";
import Download from "../download/Download";
import X from '../../assets/X.svg'
import './Xycard.css'
import Nothing from "../../components/nothing/nothing";

export default function Xycard() {

    const [loading, setLoading] = useState<boolean>(true)
    const [invalidSteam, setInvalidSteam] = useState(false)
    const navigate = useNavigate()
    const xycardRef = useRef<any>()
    const { user } = useParams()
    const [userData, setUserData] = useState({
        games: [],
        total2weekplay: 0
    })

    useEffect(() => {
        axios.get(`https://xylium.onrender.com/user/recent/${user}`)
        .then((res) => {
            setUserData(res.data)
            setLoading(false)
        })
        .catch((err) => {
            if (err.response.status === 400) {
                navigate('../404')
            } 
            setInvalidSteam(true)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="xycard">
            <Topbar menu="card"/>
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
                    {
                        userData.games.length > 0 ? (
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
                        ) : (
                            <div className="xycard__no-games">
                                <Nothing text={ invalidSteam ? "Your Steam-ID Does not Exist.": "Play more to get something here!"}/>
                            </div>
                        )
                    }
                </div>
            </motion.div>
            <div className="xycard__options">
                <Button text="Download" onClick={() => exportComponentAsPNG(xycardRef, {'fileName' : `XYCARD__${user}`})}/>
                <Button text="Share Card" onClick={() => navigator.clipboard.writeText(`https://xylium.vercel.app/${user}/xycard`)} />
            </div>
            <Download ref={xycardRef}/>
        </div>
    )
}