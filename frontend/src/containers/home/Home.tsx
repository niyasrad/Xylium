import axios from "axios";
import { useEffect, useState } from "react";
import { useAppWrapperContext } from "../../AppWrapper";
import './Home.css'

export default function Home() {
    
    const { globalUsername } = useAppWrapperContext()
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

    console.log(result)
    if (loading) {
        return (
            <div className='loading'>
                
            </div>
        )
    }
    return(
        <div className="home">
            <div className="home__content">
                <div className="home__topbar">
                    <span className="home__logo">Xylium</span>
                    <span className="home__welcome">Welcome, {globalUsername}</span>
                </div>
                <div className="home__main">
                    <div className="home__type-writer">
                    </div>
                    <div className="home__options">
                    </div>
                </div>
            </div>
        </div>
    )
}