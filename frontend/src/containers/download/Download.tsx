import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Profilebar from "../../components/profilebar/Profilebar";
import X from '../../assets/X.svg'
import './Download.css'

const Download = React.forwardRef((props: any, ref: any) => {

    const { user } = useParams()
    const [userData, setUserData] = useState({
        games: [],
        total2weekplay: 0
    })

    useEffect(() => {
        axios.get(`https://xylium.onrender.com/user/recent/${user}`)
        .then((res) => {
            setUserData(res.data)
        })
        .catch(() => {})
    }, [])

    return (
        <div className="download__content" ref={ref}>
            <div className="download__games">
                <div className="download__top-info">
                    <span className="download__heading">Xylium</span>
                    <Profilebar username={user ? user: 'tester'}/>
                </div>
                {
                    userData.games.length > 0 ? (
                        <div className="download__information">
                            <div className="download__games-list">
                            {
                                userData.games.slice(0,2).map((game: any) => (
                                    <div className="download__recent-game">
                                        <img className="download__recent-image" src={game.img_icon_url === "" ? "https://cdn.discordapp.com/attachments/946407954180108328/1098972496453173389/sport.png" : "https://cdn.akamai.steamstatic.com/steam/apps/" + game.appid + "/header.jpg"}  alt={game.name} />
                                        <span className="download__hours-put">{game.playtime_2weeks} Minutes</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="download__diagnosis">
                            <span className="download__dia-intro">
                                You played, in the last two weeks  for over,
                            </span>
                            <span className="download__dia-timings">{userData.total2weekplay} Minutes</span>
                        </div>
                    </div>
                    ) : (
                        <div className="download__no-games">
                            <img  className="download__no-games-logo" src={X} alt="Xylium Logo" />
                            <span className="download__no-games-heading">Owww.. Nothing to show</span>
                            <span className="download__no-games-desc">Play more to get something here!</span>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
})

export default Download