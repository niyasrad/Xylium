import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Landing from './containers/landing/Landing'
import './index.css'
import LogIn from './user/login/LogIn'
import SignUp from './user/signup/SignUp'

// @ts-ignore
import AnimatedCursor from "react-animated-cursor"


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
  }
])



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>,
)
