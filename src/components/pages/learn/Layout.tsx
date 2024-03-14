
import { Outlet } from "react-router-dom"
import LearnSide from "../../LearnSide"
import Navbar from "../../Navbar"


const Layout = () => {
  return (
   
      <div className="containerpro">
  <div className="sidebar"><LearnSide /></div>
  <div className="navbar"><Navbar /></div>
  <div className="content"><Outlet /></div>
      </div>
      
      
      
   
  )
}

export default Layout
