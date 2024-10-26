import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/signupComponent/Signup'
import './Components/signupComponent/Signup.css'
<<<<<<< HEAD
=======
import Login from './Components/LoginComponent/login'
import './Components/LoginComponent/login.css'
>>>>>>> origin
import LandingPage from './Components/landingPageComponent/LandingPage'
import Events from './Components/eventsComponent/Events'
import Discussions from './Components/discussionComponent/Discussions'
import Resources from './Components/resourceComponent/Resources'
import About from './Components/aboutComponent/About'
<<<<<<< HEAD
=======
import Profile from './Components/profileComponent/profile'
import './Components/profileComponent/profile.css'
>>>>>>> origin
import Blog from './Components/blogComponent/Blog'
function App() {
 
  return (
   
     <BrowserRouter>
      <Routes>
       <Route path="/signup" element={<Signup/>}></Route>
<<<<<<< HEAD
=======
       <Route path="/login" element={<Login/>}></Route>
>>>>>>> origin
       <Route path="/landingPage" element={<LandingPage/>}></Route>
        <Route path="/events" element={<Events/>}></Route>
       <Route path="/discussions" element={<Discussions/>}></Route>
       <Route path="/resources" element={<Resources/>}></Route>
       <Route path="/resources/:id" Component={Blog}/>
       <Route path="/about" element={<About/>}></Route>
<<<<<<< HEAD
=======
       <Route path="/profile" element={<Profile/>}></Route>
>>>>>>> origin
      </Routes>
     </BrowserRouter>
 
  )
}

export default App
