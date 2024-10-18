import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/signup'
import './components/signup.css'
function App() {
 
  return (
   
     <BrowserRouter>
      <Routes>
       <Route path="/signup" element={<Signup />}></Route>
      </Routes>
     </BrowserRouter>
 
  )
}

export default App
