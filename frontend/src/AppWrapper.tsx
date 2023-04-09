import axios from 'axios'
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import './AppWrapper.css'


interface AppWrapperContextType {
  isLoggedIn : boolean,
  setIsLoggedIn? : Dispatch<SetStateAction<boolean>>
}

const defaultValue = {
  isLoggedIn: false
}

const AppWrapperContext = createContext<AppWrapperContextType>(defaultValue)

export const useAppWrapperContext = () => useContext(AppWrapperContext)


function AppWrapper({ children }: { children: React.ReactNode }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {

    const token = localStorage.getItem("accessToken")
    console.log(token)
    if (!token) return

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get('http://localhost:8080/api/checkauth')
    .then(() => {
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
        setIsLoggedIn
      }}
    >
      {
        children
      }
    </AppWrapperContext.Provider>
  )
}

export default AppWrapper
