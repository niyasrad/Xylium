import axios from "axios";
import { useEffect, useState } from "react";
import './Profilebar.css'
import { backupImage, defaultBlank } from "../dfriendbar/DFriendBar";

export default function Profilebar({ username }: { username: string}) {
    
    const [userData, setUserData] = useState({
        avatarfull: '',
        personaname: 'Loading..',
        personastate: 0
    })


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_API}/user/person/username/${username}`)
        .then((res) => {
            setUserData(res.data)
        })
        .catch((err) => {
            setUserData({
                avatarfull: '',
                personaname: 'User',
                personastate: 0
            })
        })
    }, [])

    return (
        <div className="pbar">
            <div className="pbar__name">
                {userData.personaname}
            </div>
            <div className="pbar__image">
                <img src={!userData.avatarfull || userData.avatarfull === '' || userData.avatarfull === defaultBlank ? backupImage : userData.avatarfull} alt="Profile Picture"/>
                <div className={`pbar__indicator ${userData.personastate === 0 ? 'pbar__indicator--away': 'pbar__indicator--online'}`}></div>
            </div>
        </div>
    )
}