import './App.css'
import Home from '../src/pages/launch.jsx'
import About from '../src/pages/aboutus.jsx'
import Todo from '../src/pages/todo.jsx'
import Dash from '../src/pages/dashboard.jsx'
import Contacts from '../src/pages/contacts.jsx'
import Budget from '../src/pages/budget.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import { Routes, Route } from "react-router-dom";
import SiteHeadingAndNav from './SiteHeadingAndNav.jsx'


function App() {

  return (
    <>  
    <SiteHeadingAndNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Dashboard" element={<Dash />} />
          <Route path="/Budget" element={<Budget />} />
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </main>  

      <footer className="footer">© 2025 Something Blue. All rights reserved.</footer>
    </>
  )
}

export default App
