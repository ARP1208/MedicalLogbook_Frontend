import React from 'react'
import logo from "../Assets/icons/logo.png";
import notification1 from '../Assets/icons/notification1.png'
const Adminnavbar = () => {
  return (
    <div className="container">
    <div className="top-bar w-full top-0"></div>
    <div className="mid-bar w-full top-30">
      <div className="logo">
        <img className="logoicon" src={logo}></img>
      </div>
      <div className="logotext">Medical Log</div>
      <div className="notification ml-425 mt-9">
        <img className="notifyicon1" src={notification1}></img>
      </div>
      <div className="btnlogout" type="Button">
        Logout
      </div>
    </div>

    <nav className="navbar navbar-expand-lg navbar-dark bg-grey fixed-top ">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Registration
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Announcements
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Gradesheet
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  )
}

export default Adminnavbar
