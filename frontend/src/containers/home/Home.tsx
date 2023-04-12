import axios from "axios";
import { useEffect, useState } from "react";
import { useAppWrapperContext } from "../../AppWrapper";
import { Typewriter } from 'react-simple-typewriter'
import './Home.css'
import Steambar from "../../components/steambar/Steambar";
import Button from "../../components/button/Button";


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
    
    const { globalUsername, isLoggedIn } = useAppWrapperContext()
    const [loading, setLoading] = useState(true)
    const [result, setResult] = useState({}) 


    useEffect(() => {
        try {
            axios.get('http://localhost:8080/user/')
            .then((res) => setResult(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
        } catch (err) {
            console.log(err)
        }
    }, [])

    
    const words = [
        getPersonaState(result),
        getLastLogoff(result),
        getTimeCreated(result),
    ];

    if (loading || !isLoggedIn) {
        return (
            <div className='loading'>
                
            </div>
        )
    }
    return(
        <div className="home">
            <div className="home__content">
                <div className="home__topbar">
                    <span className="home__logo link">Xylium</span>
                    <span className="home__welcome">Welcome, {globalUsername}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="home__signout link">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    </span>
                </div>
                <div className="home__main">
                    <div className="home__type-writer">
                        <span className="home__type-bg">Your Steam Was&nbsp;</span>
                        <span className="home__type-writed-text link">
                            <Typewriter 
                                words={words}
                                loop={0}
                                cursor
                                cursorStyle='_'
                                typeSpeed={50}
                                deleteSpeed={10}
                                delaySpeed={3000}
                            />
                        </span>
                    </div>
                    <div className="home__options">
                        <Steambar holder={result}/>
                        <div className="home__option-cards">
                            <span className="home__options-text">Navigate to one of the sections for fun!</span>
                            <Button text="DBoard" />
                            <Button text="XyCard"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}