import axios from "axios";
import { useEffect, useState } from "react";
import { useAppWrapperContext } from "../../AppWrapper";
import { Typewriter } from 'react-simple-typewriter'
import './Home.css'
import Steambar from "../../components/steambar/Steambar";
import { AnimatePresence, motion } from "framer-motion";
import X from '../../assets/X.svg'
import { useNavigate } from "react-router";
import Topbar from "../../components/topbar/Topbar";
import Loading from "../../components/loading/Loading";
import Nothing from "../../components/nothing/nothing";


function unixTimeToDays(unixTime: number) {
    const now = new Date();
    const milliseconds = now.getTime() - unixTime * 1000;
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return days;
}

function getLastLogoff(response: any) {
    const now = new Date().getTime() / 1000;
    const logoff = unixTimeToDays(response.lastlogoff);
    const days = unixTimeToDays(now) - logoff;
    return `Last Logged Off ${days} Days Ago`;
}

function getPersonaState(response: any) {
    const states = [
      'Offline',
      'Online',
      'Busy',
      'Away',
      'Snooze',
      'Looking For Trades',
      'Looking To Play'
    ];
    const state = states[response.personastate];
    return `${state} Just Now`;
}

function getTimeCreated(response: any) {
    const now = new Date().getTime() / 1000;
    const created = unixTimeToDays(response.timecreated);
    return `Created ${created} Days Ago`;
}

export default function Home() {
    
    const { globalUsername, isLoggedIn, privateSteam, invalidSteam, handleSignOut } = useAppWrapperContext()

    

    const [mobileNavbar, setMobileNavbar] = useState(false)
    const [loading, setLoading] = useState(true)
    const [friends, setFriends] = useState([])
    const [recentGames, setRecentGames] = useState([])
    const [result, setResult] = useState({
        steamid: "Loading.."
    }) 
    const navigate = useNavigate()

    //https://xylium.onrender.com
    //http://localhost:8080
    useEffect(() => {
        axios.get('https://xylium.onrender.com/api/checkauth')
        .then(() => {})
        .catch(() => {
            navigate('/')
        })
        if (privateSteam || invalidSteam) {
            setLoading(false)
            return
        }
        try {
            axios.all([ 
                axios.get('https://xylium.onrender.com/user/person/me'),
                axios.get('https://xylium.onrender.com/user/friends'), 
                axios.get('https://xylium.onrender.com/user/recent')
            ])
            .then(axios.spread((res1, res2, res3) => {
                setResult(res1.data)
                setFriends(res2.data)
                setRecentGames(res3.data.games)
            }))
            .catch(() => {})
            .finally(() => setLoading(false))
        } catch (err) {
             navigate('/')
        }
    }, [])

    
    const words = [
        getPersonaState(result),
        getLastLogoff(result),
        getTimeCreated(result),
    ];

    if (loading || !isLoggedIn) {
        return (
            <Loading />
        )
    }
    return(
        <div className="home">
            <Topbar menu="home"/>
            <div className="home__content">
                <motion.div 
                    className="home__main"
                    initial={{ opacity: 0 }} 
                    whileInView={{opacity: 1}} 
                >
                    <div className="home__first">
                        <div className="home__profile">
                            <span className="home__username">{globalUsername}</span>
                            <span className="home__steamid">{privateSteam ? "Profile Private" : invalidSteam ? "Profile Invalid" : result.steamid}</span>
                            <div className="home__type-writer">
                                <span className="home__type-bg">Your Steam Was&nbsp;</span>
                                <span className="home__type-writed-text link">
                                    <Typewriter 
                                        words={ invalidSteam ? ["Not Found. Please Check your Steam-ID, and Try Again."] : privateSteam ? ["Suspected to be Private, Change Visibility to Public."]: words}
                                        loop={0}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={100}
                                        deleteSpeed={110}
                                        delaySpeed={5000}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="home__friends">
                            <div className="home__category">
                                <span>Friends</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="home__category-svg link">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </div>
                            <div className="home__friends-list">
                                {
                                    (friends && friends.length > 0) ?
                                    friends.slice(0,3).map((friend) => (
                                        <Steambar friend={friend} dboard={false} />
                                    ))
                                    :
                                    <Nothing text={invalidSteam ? "Your Steam-ID Does not Exist." : privateSteam ? "Your Steam Profile is Private!" : "Try getting more friends!"}/>
                                }
                            </div>
                        </div>   
                    </div>
                    <div className="home__recent">
                        <div className="home__category">
                            <span>Recently Played</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="home__category-svg link">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </div>
                        <div className="home__recent-list">
                            {
                                (recentGames && recentGames.length > 0) ? 
                                recentGames.map((game: any) => (
                                    <div className="home__recent-game">
                                        <img src={game.img_icon_url === "" ? "https://cdn.discordapp.com/attachments/946407954180108328/1098972496453173389/sport.png" : "https://cdn.akamai.steamstatic.com/steam/apps/" + game.appid + "/header.jpg"}  alt={game.name} />
                                        <div className="home__recent-gamebg">
                                            <span className="home__recent-gamename">
                                                {game.name}
                                            </span>
                                        </div>
                                    </div>  
                                ))
                                :
                                <Nothing text={invalidSteam ? "Your Steam-ID Does not Exist." : privateSteam ? "Your Steam Profile is Private!" : "Play more to get something here!"} />
                            }
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}