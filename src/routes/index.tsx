import {Route, createBrowserRouter, createRoutesFromElements,Outlet} from 'react-router-dom'
 import Navbar from '../components/Navbar'
import QuickStartPage from '../components/pages/learn'
import Layout from '../components/pages/learn/Layout'
import ThinkingReact from '../components/pages/learn/Thinking'
import Instlation from '../components/pages/learn/Instlation'
import Contact from '../components/pages/Contact'
import AboutPage from '../components/pages/learn/AboutPage'
import Login from '../components/pages/Login'
 import Contribute from '../components/pages/Contribute'
import Home from '../components/pages/Home';
import ProtectedRoute from '../components/auth/ProtectedRoute'
import ErrorHandler from '../components/errors/ErrorHandler'
import PageNotFound from '../components/pages/PageNotFound'


const isLoggedIn = false;
const userData: { email: string } | null = isLoggedIn ? { email: "email@gmail.com" } : null;

const router = createBrowserRouter( createRoutesFromElements(
    <>
   
    <Route path="/" element={<div>
        <Navbar />
      <Outlet />  
    </div>}
     errorElement={<ErrorHandler />} >

        <Route index element={<Home />}  />
       <Route path='contact' element={<div><Contact /></div>} errorElement={<ErrorHandler />} />
       <Route path='about' element={<AboutPage />} errorElement={<ErrorHandler />} />

       <Route path='contribute' 
       element={<ProtectedRoute isAllowed={isLoggedIn} 
       redirectPath="/login" data={userData} >
        <Contribute />
      
       </ProtectedRoute>}  
       errorElement={<ErrorHandler statusCode={404} />} 
       />

       <Route path='login' 
       element={<ProtectedRoute isAllowed={!isLoggedIn} 
       redirectPath="/contribute" data={userData} >
        <Login />
       </ProtectedRoute>} />

    </Route>

      <Route path='/learn' element={<Layout />}>
        <Route index element={<QuickStartPage />}></Route>
        <Route path="installation" element={<Instlation />}></Route>
        <Route path="thinking-in-react" element={<ThinkingReact />}></Route>
     </Route>

     {/* Page Not Found */}
  <Route path="*" element={<PageNotFound />} />
    </>
    
))

  export default router