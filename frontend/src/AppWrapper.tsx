import axios from 'axios'
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useState } from 'react'
import './AppWrapper.css'


interface AppWrapperContextType {
  isLoggedIn : boolean,
  globalUsername: string,
  privateSteam: boolean,
  invalidSteam: boolean,
  setIsLoggedIn? : Dispatch<SetStateAction<boolean>>,
  setGlobalUsername?: Dispatch<SetStateAction<string>>,
  setPrivateSteam?: Dispatch<SetStateAction<boolean>>,
  setInvalidSteam?: Dispatch<SetStateAction<boolean>>
  handleSignOut?: () => void;
}

const defaultValue = {
  isLoggedIn: false,
  globalUsername: '',
  privateSteam: false,
  invalidSteam: false
}

const AppWrapperContext = createContext<AppWrapperContextType>(defaultValue)

export const useAppWrapperContext = () => useContext(AppWrapperContext)


function AppWrapper({ children }: { children: React.ReactNode }) {

  const [isLoggedIn, setIsLoggedIn] = useState(defaultValue.isLoggedIn)
  const [globalUsername, setGlobalUsername] = useState(defaultValue.globalUsername)
  const [privateSteam, setPrivateSteam] = useState(false)
  const [invalidSteam, setInvalidSteam] = useState(false)


  const ResetAppContext = () => {
    setGlobalUsername(defaultValue.globalUsername)
    setIsLoggedIn(defaultValue.isLoggedIn)
    setPrivateSteam(defaultValue.privateSteam)
    setInvalidSteam(defaultValue.invalidSteam)
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
      axios.get('https://xylium.onrender.com/user/person/me')
      .then((res) => {
        if (res.data.communityvisibilitystate !== 3) {
          setPrivateSteam!(true)
        }
      })
      .catch((err) => {
        setInvalidSteam!(true)
      })
      .finally(() => {
        setIsLoggedIn(true)
      })
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
        privateSteam,
        invalidSteam,
        setIsLoggedIn,
        setGlobalUsername,
        setPrivateSteam,
        setInvalidSteam,
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
