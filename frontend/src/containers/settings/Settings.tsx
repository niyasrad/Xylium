import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import OptButton from '../../components/optbutton/OptButton'
import Topbar from '../../components/topbar/Topbar'
import './Settings.css'

import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import Popover, { Actions, PopoverProps } from '../../components/popover/Popover'
import { deletePopover, emailPopover, passwordPopover } from './Settings.data'

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

    const [popoverOpen, setPopoverOpen] = useState<null | PopoverProps>(null)

    const handleClose = useCallback(() => {setPopoverOpen(null)}, [])

    const handleClick = (option: "email" | "password" | "delete") => {
        if (option === "email") {
            setPopoverOpen(emailPopover)
        } else if (option === "password") {
            setPopoverOpen(passwordPopover)
        } else if (option === "delete") {
            setPopoverOpen(deletePopover)
        }
    }

    return (
        <div className="settings">
            <AnimatePresence>
            {
                popoverOpen !== null &&
                <motion.div
                    key={JSON.stringify(popoverOpen)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='settings__popover'
                >
                    <Popover 
                        label={popoverOpen.label || ""}
                        operation={popoverOpen.operation || Actions.save} 
                        onCancel={handleClose}
                        onComplete={popoverOpen.onComplete|| null}
                    />
                </motion.div>
            }
            </AnimatePresence>
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
                                onClick={() => handleClick("email")}
                            />
                            <OptButton 
                                text="Change Password"
                                onClick={() => handleClick("password")}
                            />
                            <OptButton 
                                text="Delete Account"
                                isDelete={true}
                                onClick={() => handleClick("delete")}
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