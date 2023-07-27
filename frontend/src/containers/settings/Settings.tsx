import { useEffect, useLayoutEffect, useState } from 'react'
import OptButton from '../../components/optbutton/OptButton'
import Topbar from '../../components/topbar/Topbar'
import './Settings.css'

import { motion } from 'framer-motion'
import axios from 'axios'

interface UserSettingData {
    username: string;
    email: string;
    createdAt: string;
}

interface UserPercentileData {
    highestValue: string;
    percentile: string;
}

const defaultUserSetting = {
    username: 'Loading..',
    email: 'loading@example.com',
    createdAt: '20XX'
}

const defaultPercentileData = {
    highestValue: '00.00',
    percentile: '0'
}

const SettingCard = () => {

    const [userData, setUserData] = useState<UserSettingData>(defaultUserSetting)

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + '/stats/info')
        .then((res) => {
            setUserData(res.data)
        })  
        .catch(() => {})
    }, [])

    return (
        <div className='sng-card'>
            <div className='sng-card__text sng-card__text--top'>{userData.username}</div>
            <div className='sng-card__text sng-card__text--mid'>{userData.email}</div>
            <div className='sng-card__text sng-card__text--bottom'>
                <span className='sng-card__user'>
                    XYLIUM USER SINCE
                </span>
                <span className='sng-card__year'>{userData.createdAt}</span>
            </div>
        </div>
    )
}

const StatsCard = () => {

    const [percentileData, setPercentleData] = useState<UserPercentileData>(defaultPercentileData)

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + '/stats/percentile')
        .then((res) => {
            setPercentleData(res.data)
        })  
        .catch(() => {})
    }, [])

    return (
        <div className='stat-card'>
            <div className='stat-card__stat'>
                <span className='stat-card__heading'>HIGHEST ACCOUNT VALUE RECORDED</span>
                <span className='stat-card__value'>${percentileData.highestValue}</span>
            </div>
            <div className='stat-card__stat'>
                <span className='stat-card__heading'>XYLIUM STATS PERCENTILE</span>
                <span className='stat-card__value'>{percentileData.percentile}%</span>
            </div>
            <div className='stat-card__stat stat-card__stat--'>
                <span className='stat-card__heading'>DEVELOPED BY NIYAS HAMEED</span>
                <a
                    href="https://niyas-hameed.vercel.app/"
                    target='_blank'
                >
                    <OptButton
                        text='PORTFOLIO'
                    />
                </a>
            </div>
        </div>
    )
}



export default function Settings() {

    return (
        <div className="settings">
            <Topbar menu="home" />
            <div className="settings__content">
                <motion.div
                    className="settings__main"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1}}
                >
                    <div className="settings__port">
                        <span className="settings__heading">SETTINGS</span>
                        <div className="settings__port-content">
                            <SettingCard />
                            <OptButton 
                                text="Change E-mail"
                            />
                            <OptButton 
                                text="Change Password"
                            />
                            <OptButton 
                                text="Delete Account"
                                isDelete={true}
                            />
                        </div>
                    </div>
                    <div className="settings__port">
                        <span className="settings__heading">STATS</span>
                        <div className="settings__port-content">
                            <StatsCard />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}