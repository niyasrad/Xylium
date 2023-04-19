import axios from "axios";
import React, { useEffect, useState } from "react";
import './Profilebar.css'

export default function Profilebar({ username }: { username: string}) {
    
    const [userData, setUserData] = useState({
        avatarfull: '',
        personaname: 'Loading..',
        personastate: 0
    })


    useEffect(() => {
        axios.get('https://xylium.onrender.com/user/person/')
        .then((res) => {
            setUserData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="pbar">
            <div className="pbar__name">
                {userData.personaname}
            </div>
            <div className="pbar__image">
                <img src={userData.avatarfull} alt="profile picture"/>
                <div className={`pbar__indicator ${userData.personastate === 0 ? 'pbar__indicator--away': 'pbar__indicator--online'}`}></div>
            </div>
        </div>
    )
}