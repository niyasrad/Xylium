import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router";
import { useAppWrapperContext } from "../../AppWrapper";
import Loading from "../../components/loading/Loading";
import Topbar from "../../components/topbar/Topbar";
import './DBoard.css'
import DGamesBar from "../../components/dgamesbar/DGamesBar";
import Nothing from "../../components/nothing/nothing";
import DFriendBar from "../../components/dfriendbar/DFriendBar";

export default function DBoard() {

    const { globalUsername, isLoggedIn, privateSteam, invalidSteam } = useAppWrapperContext()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const [friends, setFriends] = useState<any>()
    const [games, setGames] = useState<any>()
    const [result, setResult] = useState({
        steamid: "Loading..",
        avatarfull: 'https://cdn.discordapp.com/attachments/946407954180108328/1098973545431826472/sport_184_184_px.png'
    }) 

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + '/api/checkauth')
        .then(() => {})
        .catch(() => {
            navigate('/')
        })

        try {
            axios.all([ 
                axios.get(import.meta.env.VITE_BASE_API + '/user/person/me'),
                axios.get(import.meta.env.VITE_BASE_API + '/user/friends'), 
                axios.get(import.meta.env.VITE_BASE_API + '/user/games')
            ])
            .then(axios.spread((res1, res2, res3) => {
                setResult(res1.data)
                setFriends(res2.data)
                setGames(res3.data)
            }))
            .catch(() => {})
            .finally(() => setLoading(false))
        } catch (err) {
             navigate('/')
        }

    }, [])


    if (loading || !isLoggedIn) {
        return (
            <Loading />
        )
    }

    return (
        <div className="dboard">
            <Topbar menu="board"/>

            <div className="dboard__content">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="dboard__main"
                >
                    <div className="dboard__section">
                        <div className="dboard__s-header">
                            <div className="dboard__s-title">
                                Friends
                            </div>
                            <svg onClick={() => navigate('/friends')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dboard__s-svg link">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </div>    
                        <div className="dboard__s-list">
                        {
                            (friends && friends.length > 0) ? 
                            (
                                
                                        friends.slice(0,6).map((friend: any) => (
                                            <DFriendBar friend={friend} key={friend.steamid}/>
                                        )) 
                            )   
                            :
                            (
                                <Nothing text={ invalidSteam ? "Your Steam-ID Does not Exist." : privateSteam ? "Your Steam Profile is Private!" :  "Try getting more friends!"} />
                            )
                        }
                        </div>
                    </div>
                    <div className="dboard__section">
                        <div className="dboard__s-header">
                            <div className="dboard__s-title">
                                Owned Games
                            </div>
                            <svg onClick={() => navigate('/games')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dboard__s-svg link">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </div>    
                        <div className="dboard__s-list">
                        {
                            (games && games.games.length > 0) ? 
                            (
                                games.games.slice(0,6).map((game: any) => (
                                    <DGamesBar game={game} key={game.name}/>
                                ))
                            )   
                            :
                            (
                                <Nothing text={ invalidSteam ? "Your Steam-ID Does not Exist." : privateSteam ? "Your Steam Profile is Private!" : "Buy more games to show something here!"} />
                            )
                        }
                        </div> 
                    </div>
                    
                </motion.div>
            </div>
        </div>
    )
}