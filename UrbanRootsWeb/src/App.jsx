import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/signupComponent/Signup'
import './Components/signupComponent/Signup.css'
import LandingPage from './Components/landingPageComponent/LandingPage'
function App() {
 
  return (
   
     <BrowserRouter>
      <Routes>
       <Route path="/signup" element={<Signup />}></Route>
       <Route path="/landingPage" element={<LandingPage/>}></Route>
      </Routes>
     </BrowserRouter>
 
  )
}

export default App
