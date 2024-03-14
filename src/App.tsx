

import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'


function App() {


  return (
    <>   
    
    <main className='text-xl font-medium'>
     <RouterProvider router={router} />
    </main>
    </>
    
   
  )
}

export default App
