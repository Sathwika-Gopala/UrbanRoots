import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/signupComponent/Signup'
import './Components/signupComponent/Signup.css'
import Login from './Components/LoginComponent/login'
import './Components/LoginComponent/login.css'
import LandingPage from './Components/landingPageComponent/LandingPage'
import Events from './Components/eventsComponent/Events'
import Discussions from './Components/discussionComponent/Discussions'
import Resources from './Components/resourceComponent/Resources'
import Contact from './Components/contactComponent/contact'
import Profile from './Components/profileComponent/profile'
import './Components/profileComponent/profile.css'
import Blog from './Components/blogComponent/Blog'
import FeedbackButton from './Components/feedbackComponent/feedbackButton'
import Payment from './Components/paymentComponent/payment'
import Chatbot from './Components/chatbotComponent/chatbotButton'
function App() {
 
  return (
   
     <BrowserRouter>
      <Routes>
       <Route path="/signup" element={<Signup/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/" element={<LandingPage/>}></Route>
       <Route path="/events" element={<Events/>}></Route>
       <Route path="/discussions" element={<Discussions/>}></Route>
       <Route path="/resources" element={<Resources/>}></Route>
       <Route path="/resources/:id" Component={Blog}/>
       <Route path="/contact" element={<Contact/>}></Route>
       <Route path="/profile" element={<Profile/>}></Route>
       <Route path="/payment" element={<Payment/>}></Route>
       {/* <Route path="/chatbot" element={<Chatbot/>}></Route> */}
      </Routes>
      <Chatbot/>
      <FeedbackButton/>
     </BrowserRouter>
 
  )
}

export default App
