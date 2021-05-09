import React from 'react'
import { Link } from 'react-router-dom'
import { BiUserCircle, BiUser, BiHome, BiLogOut, BiLogIn, BiUserPlus } from 'react-icons/bi'

const Navbar = ({ isLogin, onLogout, user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="navBar">
      <div className="container">
        <Link className="navbar-brand" to="/">Express-React</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isLogin ?
            <ul className="navbar-nav ml-auto">
              <li className="nav-item d-flex justify-content-center align-items-center">
                <Link className="nav-link py-0" to="/profile">
                  <BiHome className="icon-nav mr-2" />
                  Home
                </Link>
              </li>
              <li className="nav-item d-flex justify-content-center align-items-center">
                <Link className="nav-link py-0" to="/profile">
                  <BiUserCircle className="icon-nav mr-2" />
                  {`${user.firstName} ${user.lastName}`}
                </Link>
              </li>
              <li className="nav-item d-flex justify-content-center align-items-center">
                <Link className="nav-link py-0" to="/users">
                  <BiUser className="icon-nav mr-2" />
                  All Users
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => onLogout()}>
                  <BiLogOut className="icon-nav mr-2" />
                  Logout
                  </button>
              </li>
            </ul>
            :
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <BiLogIn className="icon-nav mr-2" />
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <BiUserPlus className="icon-nav mr-2" />
                  Resister
                </Link>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
