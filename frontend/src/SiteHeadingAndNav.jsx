import { NavLink, Link } from "react-router-dom";
import logo from '../src/photos/logo.png'
import './nav.css'

export default function SiteHeadingAndNav() {
  return (
    <header>
      
      <nav className="navv">
      <Link to="/" id="logo" className="ct-navbar-logo">
        <img src={logo} alt="Site Logo" className="logo" />
      </Link> 
        <ul className="uls">
          <ul>
            <NavLink to="/about">About</NavLink>
          </ul>
          <ul>
            <NavLink to="/budget">Budget</NavLink>
          </ul>
          <ul>
            <NavLink to="/contacts">Contacts</NavLink>
          </ul>
          <ul>
            <NavLink to="/dashboard">Dash</NavLink>
          </ul>
          <ul>
            <NavLink to="/todo">To Do</NavLink>
          </ul>
        </ul>
      </nav>
    </header>
  );
}
