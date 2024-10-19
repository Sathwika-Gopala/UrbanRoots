import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/signupComponent/Signup'
import './Components/signupComponent/Signup.css'
import LandingPage from './Components/landingPageComponent/LandingPage'
import Events from './Components/eventsComponent/Events'
import Discussions from './Components/discussionComponent/Discussions'
import Resources from './Components/resourceComponent/Resources'
import About from './Components/aboutComponent/About'
function App() {
 
  return (
   
     <BrowserRouter>
      <Routes>
       <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/landingPage" element={<LandingPage/>}></Route>
        <Route path="/events" element={<Events/>}></Route>
       <Route path="/discussions" element={<Discussions/>}></Route>
       <Route path="/resources" element={<Resources/>}></Route>
       <Route path="/about" element={<About/>}></Route>
      </Routes>
     </BrowserRouter>
 
  )
}

export default App
