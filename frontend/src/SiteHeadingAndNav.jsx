import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "./context/current-user-context";
import logo from '../src/photos/logo.png';
import './nav.css';

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <nav className="navv">
        <Link to="/" id="logo" className="ct-navbar-logo">
          <img src={logo} alt="Site Logo" className="logo" />
        </Link>

        <ul className="uls">
          {currentUser && (
            <ul>
              <NavLink to="/dashboard">Dash</NavLink>
            </ul>
          )}
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
            <NavLink to="/todo">To Do</NavLink>
          </ul>
          <ul>
            <NavLink to="/trackers">Tracker</NavLink>
          </ul>
          <ul>
            <NavLink to="/calendar">Calendar</NavLink>
          </ul>
          <ul>
            <NavLink to="/journal">Journal</NavLink>
          </ul>
        </ul>
      </nav>
    </header>
  );
}
