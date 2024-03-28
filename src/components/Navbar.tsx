import {  NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className=" rounded p-5 max-w-sm mx-auto my-7">
        <ul className="flex items-center justify-between space-x-6">

            <li className="hover:text-[#215ce7] text-xl">
                <NavLink to="/">Home</NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-xl">
                <NavLink to="/contact">Contact</NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-xl">
                <NavLink to="/about">About </NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-xl">
                <NavLink to="/learn">Learn</NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-xl">
                <NavLink to="/register">register</NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-xl">
                <NavLink to="/login">Login</NavLink>
            </li>

        </ul>
      
    </nav>
  )
}

export default Navbar
