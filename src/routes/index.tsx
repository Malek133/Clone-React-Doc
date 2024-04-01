// import {Route, createBrowserRouter, createRoutesFromElements,Outlet} from 'react-router-dom'
//  import Navbar from '../components/Navbar'
// // import QuickStartPage from '../components/pages/learn'
// // import Layout from '../components/pages/learn/Layout'
// // import ThinkingReact from '../components/pages/learn/Thinking'
// // import Instlation from '../components/pages/learn/Instlation'
// import Contact from '../components/pages/Contact'
// import AboutPage from '../components/pages/learn/AboutPage'
// import Login from '../components/pages/Login'
// import Home from '../components/pages/Home';
// import ProtectedRoute from '../components/auth/ProtectedRoute'
// import ErrorHandler from '../components/errors/ErrorHandler'
// import PageNotFound from '../components/pages/PageNotFound'
// import Register from '../components/pages/Register'





// const storageKey = 'routeLoged';
// const userDataString = localStorage.getItem(storageKey);
// const userData = userDataString ? JSON.parse(userDataString) : null
// // console.log(userData)

// const router = createBrowserRouter( createRoutesFromElements(
//     <>
   
//     <Route path="/" element={<div>
//         <Navbar />
//       <Outlet />  
      
//     </div>}
//      errorElement={<ErrorHandler />} >

//         <Route index element={<Home />}  />
//        <Route path='contact' element={
//        <div><Contact /></div>} 
//        errorElement={<ErrorHandler />} />
//        <Route path='about' element={<AboutPage />} 
//        errorElement={<ErrorHandler />} />
        
      
//        <Route path='register' 
//        element={<ProtectedRoute isAllowed={userData?.jwt} 
//        redirectPath="/login" data={userData}  >
//         <Register /> 
      
//        </ProtectedRoute>}  
//        errorElement={<ErrorHandler statusCode={404} />} 
//        />

//        <Route path='login' 
//        element={<ProtectedRoute isAllowed={userData?.jwt} 
//        redirectPath="/register" data={userData} >
//        <Login />
//        </ProtectedRoute>} />

      
//     </Route>

//       {/* <Route path='/learn' element={<Layout />}>
//         <Route index element={<QuickStartPage />}></Route>
//         <Route path="installation" element={<Instlation />}></Route>
//         <Route path="thinking-in-react" element={<ThinkingReact />}></Route>
//      </Route> */}

//      {/* Page Not Found */}
//   <Route path="*" element={<PageNotFound />} />
//     </>
    
// ))

//   export default router



import { Route, createBrowserRouter, 
  createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../components/pages/TodoList";
import LoginPage from "../components/pages/Login";
import Register from "../components/pages/Register";
import PageNotFound from "../components/pages/PageNotFound";
import RootLayout from "../components/pages/RootLayout";
import Layout from "../components/pages/learn/Layout";
import QuickStartPage from "../components/pages/learn";
import Instlation from "../components/pages/learn/Instlation";
import ThinkingReact from "../components/pages/learn/Thinking";
import AllTodo from "../components/pages/learn/AllTodo";




const storageKey = 'routeLoged';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} 
      errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={userData?.jwt} 
            redirectPath="/login" 
            data={userData}>
               <AllTodo />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={userData?.jwt} 
            redirectPath="/login" 
            data={userData}>
               <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/" 
            data={userData}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!userData?.jwt} 
            redirectPath="/login" data={userData?.jwt}>
              <Register />
            </ProtectedRoute>
          }
        />

      </Route>

      <Route path='/learn' element={<Layout />}>
        <Route index element={<QuickStartPage />}></Route>
        <Route path="installation" element={<Instlation />}></Route>
        <Route path="thinking-in-react" element={<ThinkingReact />}></Route>
     </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
