import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
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
import DBoard from './containers/dboard/DBoard'
import Pagination from './containers/dboard/pagination/Pagination'
import Settings from './containers/settings/Settings'
import ForgotPass from './user/forgotpass/ForgotPass'
import ResetPass from './user/resetpass/ResetPass'


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
    path: '/forgotpassword',
    element: <ForgotPass />
  },
  {
    path: '/resetpassword',
    element: <ResetPass />
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
    path: '/dboard',
    element: <DBoard />
  },
  {
    path: '/games',
    element: <Pagination listing="games" />
  },
  {
    path: '/friends',
    element: <Pagination listing="friends" />
  },
  {
    path: '/settings',
    element: <Settings />
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
    </AppWrapper>,
)
