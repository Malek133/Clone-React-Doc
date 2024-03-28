

import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
  // import { Toaster } from 'react-hot-toast'


function App() {


  return (
    <>   
    
    <main className='text-xl font-medium'>
     <RouterProvider router={router} />
     {/* <Toaster /> */}
    </main>
    </>
    
   
  )
}

export default App
