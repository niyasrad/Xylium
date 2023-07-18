import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router";
import { useAppWrapperContext } from "../../../AppWrapper";
import DFriendBar from "../../../components/dfriendbar/DFriendBar";
import DGamesBar from "../../../components/dgamesbar/DGamesBar";
import Loading from "../../../components/loading/Loading";
import Topbar from "../../../components/topbar/Topbar";
import './Pagination.css'
import Nothing from "../../../components/nothing/nothing";

export default function Pagination({ listing }: { listing: string }) {

    const { isLoggedIn, invalidSteam, privateSteam } = useAppWrapperContext()

    const navigate = useNavigate()
    const [itemList, setItemList] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    
    useEffect(() => {
        if (itemList) {
            setTotalPages(Math.ceil(itemList.length / 12))
            setCurrentPage(1)
        }
        
    }, [ itemList ])

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASE_API + '/api/checkauth')
        .then(() => {
            axios.get(`${import.meta.env.VITE_BASE_API}/user/${ listing === "games" ? "games" : "friends"}`)
            .then((res) => {
                setItemList(listing === "games" && res.data ? res.data.games : res.data)
                setTotalPages(Math.ceil(itemList.length / 12))
                setCurrentPage(1)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
        })
        .catch(() => {
            navigate('/')
        })
    }, [])

    if (loading || !isLoggedIn) {
        return (
            <Loading />
        )
    }

    const handleBackward = () => {
        setCurrentPage(1)
    }
    const handleForward = () => {
        setCurrentPage(totalPages)
    }
    const handleNext = () => {
        if (currentPage === totalPages) return
        setCurrentPage(currentPage + 1)
    }
    const handleBack = () => {
        if (currentPage === 1) return
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className="pagination">
            <Topbar menu="board"/>
            <div className="pagination__content">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }} 
                    className="pagination__main"
                >
                    <div className="pagination__section">
                        <div className="pagination__category">
                            <div className="pagination__heading">{ listing === "games" ? "Owned Games" : "Friends"}</div>
                        </div>
                        <div className="pagination__list">
                            <div className="pagination__selection">
                                <svg onClick={handleBackward} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === 1 ? "#FFA6C9":"#E90064"} className="pagination__select-svg pagination__select-svg--small link">
                                    <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                                </svg>
                                <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === 1 ? "#FFA6C9":"#E90064"} className="pagination__select-svg link">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                                </svg>
                                {currentPage + "/" + totalPages}
                                <svg onClick={handleNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === totalPages ? "#FFA6C9":"#E90064"}  className="pagination__select-svg link">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                                <svg onClick={handleForward} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === totalPages ? "#FFA6C9":"#E90064"}  className="pagination__select-svg pagination__select-svg--small link">
                                    <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                                </svg>
                            </div>
                            {
                                (itemList && itemList.length > 0) ?
                                itemList.slice((currentPage - 1) * 12, ((currentPage - 1) * 12 ) + 12).map((item: any) => (
                                        listing === "games" ?
                                        <DGamesBar game={item} key={item.appid}/>
                                        :
                                        <DFriendBar friend={item} key={item.steamid}/>
                                    )
                                )
                                :
                                (
                                    <Nothing text={ invalidSteam ? "Your Steam-ID Does not Exist." : privateSteam ? "Your Steam Profile is Private!" : "It's really lonely in here!"} />
                                )
                            }
                            {
                                ( !invalidSteam && !privateSteam && itemList && itemList.length > 0 && totalPages !== 1 ) && (
                                    <div className="pagination__selection">
                                        <svg onClick={handleBackward} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === 1 ? "#FFA6C9":"#E90064"} className="pagination__select-svg pagination__select-svg--small link">
                                            <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                                        </svg>
                                        <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === 1 ? "#FFA6C9":"#E90064"} className="pagination__select-svg link">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                                        </svg>
                                        {currentPage + "/" + totalPages}
                                        <svg onClick={handleNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === totalPages ? "#FFA6C9":"#E90064"}  className="pagination__select-svg link">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                        </svg>
                                        <svg onClick={handleForward} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ currentPage === totalPages ? "#FFA6C9":"#E90064"}  className="pagination__select-svg pagination__select-svg--small link">
                                            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                                        </svg>
                                    </div>
                                )
                            }
                             
                        </div>
                    </div>
                </motion.div>
                
            </div>
        </div>
    )
}