import { NavLink } from "react-router-dom"


const LearnSide = () => {
  return (
    <aside>
      <nav className=" p-5  my-7">
        <ul className="flex flex-col space-y-8">

            <li className="hover:text-[#215ce7] text-lg">
                <NavLink to="/learn" end >
                  Quick Start</NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-sm">
                <NavLink to="/learn/thinking-in-react">thinking-in-react</NavLink>
            </li>

            <li className="hover:text-[#215ce7] text-lg">
                <NavLink to="/learn/installation">installation</NavLink>
            </li>

            

        </ul>
      
    </nav>
    </aside>
  )
}

export default LearnSide
