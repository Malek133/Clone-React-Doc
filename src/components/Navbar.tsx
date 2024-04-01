import {  NavLink, useLocation } from "react-router-dom"
import Button from "./UI/Button";


const Navbar = () => {
     
    const {pathname} = useLocation();
    const storageKey = 'routeLoged';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null 

const Logoutin = () =>{
    localStorage.removeItem(storageKey);
    setTimeout(() =>{
      location.replace(pathname)
    },1200)
  }
  

  return (
    <nav className=" rounded p-5 max-w-sm mx-auto my-7">
        <ul className="flex items-center justify-between space-x-6">

        <li className=" duration-200 font-semibold 
        text-lg hover:text-[#d2d9e9]">
          <NavLink to="/">
            Home
          </NavLink>
        </li>
           
           {userData ? (
           <div className="text-white flex justify-center 
           items-center space-x-14">
            
           <NavLink to="/Profile">
            <p className="text-lg font-medium hover:text-[#d2d9e9] ">
              {userData.user.username}</p>
            </NavLink> 

            <Button  onClick={Logoutin}>
              Logout</Button>

            </div>
            
        ) : (
          <p className="flex items-center space-x-3 text-white">
          <li className=" duration-200 font-semibold text-lg">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className=" duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="hover:text-[#d2d9e9] text-xl">
                <NavLink to="/learn">Learn</NavLink>
            </li>
        </p>
        )}
            

            

            

        </ul>
      
    </nav>
  )
}

export default Navbar
