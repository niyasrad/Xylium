import axios from 'axios'
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useState } from 'react'
import './AppWrapper.css'


interface AppWrapperContextType {
  isLoggedIn : boolean,
  globalUsername: string,
  setIsLoggedIn? : Dispatch<SetStateAction<boolean>>,
  setGlobalUsername?: Dispatch<SetStateAction<string>>,
  handleSignOut?: () => void;
}

const defaultValue = {
  isLoggedIn: false,
  globalUsername: ''
}

const AppWrapperContext = createContext<AppWrapperContextType>(defaultValue)

export const useAppWrapperContext = () => useContext(AppWrapperContext)


function AppWrapper({ children }: { children: React.ReactNode }) {

  const [isLoggedIn, setIsLoggedIn] = useState(defaultValue.isLoggedIn)
  const [globalUsername, setGlobalUsername] = useState(defaultValue.globalUsername)


  const ResetAppContext = () => {
    setGlobalUsername(defaultValue.globalUsername)
    setIsLoggedIn(defaultValue.isLoggedIn)
  }

  const handleSignOut = () => {

    localStorage.removeItem("accessToken")
    axios.defaults.headers.common['Authorization'] = ''
    ResetAppContext()

  }
  useLayoutEffect(() => {

    const token = localStorage.getItem("accessToken")
    if (!token) return

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get('https://xylium.onrender.com/api/checkauth')
    .then((res) => {
      setGlobalUsername!(res.data.message ? res.data.message : '')
      setIsLoggedIn(true)
    })
    .catch(() => {
      localStorage.removeItem("accessToken")
      axios.defaults.headers.common['Authorization'] = ''
      setIsLoggedIn(false)
    })

  }, [isLoggedIn])

  return (
    <AppWrapperContext.Provider
      value = {{
        isLoggedIn,
        globalUsername,
        setIsLoggedIn,
        setGlobalUsername,
        handleSignOut
      }}
    >
      {
        children
      }
    </AppWrapperContext.Provider>
  )
}

export default AppWrapper
