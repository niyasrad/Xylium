import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from './AppWrapper'
import Landing from './containers/landing/Landing'
import './index.css'
import LogIn from './user/login/LogIn'
import SignUp from './user/signup/SignUp'

// @ts-ignore
import AnimatedCursor from "react-animated-cursor"
import AppWrapper from './AppWrapper'
import Home from './containers/home/Home'
import Xycard from './containers/xycard/Xycard'
import NotFound from './containers/NotFound/NotFound'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/:user/xycard',
    element: <Xycard />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWrapper>
      <AnimatedCursor
        innerSize={15}
        outerSize={35}
        color='233 ,0 ,100'
        outerAlpha={0.8}
        innerScale={2}
        outerScale={3}
        trailingSpeed={8}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link'
        ]}
      />
      <RouterProvider router={router} />
    </AppWrapper>
    
  </React.StrictMode>,
)
