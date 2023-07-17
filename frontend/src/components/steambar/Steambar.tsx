import axios from "axios";
import { useEffect, useState } from "react";
import './Steambar.css'

export default function Steambar(friend: any) {
    const [holder, setHolder] = useState({
        personaname: "Loading",
        steamid: 'Loading'
    })

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + '/user/person/steamid/'+ friend.friend.steamid)
        .then((res) =>  setHolder(res.data))
    }, [])

    return (
        <div className="steam-bar">
            <h2 className="steam-bar__name">
                {holder.personaname ? holder.personaname : 'Loading'}
            </h2>
            <div className="steam-bar__identity">
                <div className="steam-bar__id">
                    SteamID
                    <span className="steam-bar__id-small">{holder.steamid ? holder.steamid : 'Loading'}</span>
                </div>
            </div>
        </div>
    )
}