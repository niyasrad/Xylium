import React from "react";
import './Steambar.css'

export default function Steambar({ holder }: any) {
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
                <div className="steam-bar__pic">
                    <img src={holder.avatarfull ? holder.avatarfull : 'https://avatars.akamai.steamstatic.com/e935a430690f8a0cc9e22251eb7d0c0bf4112c22_full.jpg'}/>
                </div>
            </div>
        </div>
    )
}