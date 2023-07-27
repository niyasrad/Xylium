import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import './DFriendBar.css'

function unixTimestampToYear(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.getFullYear();
}
  
export const defaultBlank = "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg"
export const backupImage = "https://cdn.discordapp.com/attachments/946407954180108328/1098973545431826472/sport_184_184_px.png"

export default function DFriendBar({ friend }: { friend : any}) {
    
    const [loading, setLoading] = useState(true)
    const [holder, setHolder] = useState({
        personaname: "Loading",
        steamid: 'Loading',
        avatarfull: backupImage
    })

    const handleError = (event: any) => {
        event.target.src = backupImage
    }

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + '/user/person/steamid/'+ friend.steamid)
        .then((res) =>  {
            setHolder(res.data)
            setLoading(false)
        })
    }, [])
    
    return (
        <motion.div 
            className="df-bar link"
            initial={{ opacity: 0.2 }}
            animate={ loading ? { opacity: 0.2 } : { opacity: 1 }}
        >
            <img 
                src={holder.avatarfull === defaultBlank ? backupImage : holder.avatarfull} 
                alt="Profile Picture" 
                className="df-bar__icon" 
                onError={handleError}
            />
            <div className="df-bar__friend">
                <div className="df-bar__title">
                    {holder.personaname ? holder.personaname : 'Loading'}
                </div>
                <div className="df-bar__info">
                    <span>Friends Since</span>
                    <span className="df-bar__i-since">{unixTimestampToYear(friend.friend_since)}</span>
                </div>
            </div>
            
        </motion.div>
    )

}