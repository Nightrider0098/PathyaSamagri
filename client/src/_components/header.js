
import React, { useState, useEffect } from 'react'
import logo from "../_images/logo.png";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginPage from '../LoginPage/LoginPage'
import SignupPage from '../SignupPage/SignUp'
import {
  faIdBadge,
  faUserCircle,
  faSignOutAlt,
  faHome,

} from "@fortawesome/free-solid-svg-icons";
import BookEntryPage from '../BookEntry/BookEntryPage';
import { Link } from 'react-router-dom';


export default function Header(props) {
  const logoutHandler = () => {
    fetch("/api/Logout")
      .then((ret) => {
        return ret.json();
      })
      .then((ret) => {
        if (ret["sucess"] !== undefined) {
          localStorage.removeItem("authToken");
          props.checkLogged();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [showLogin, setLoginShow] = useState(0);

  return (

    <>
      {showLogin == 1 ? <LoginPage isLogged={props.isLogged} setLogged={props.setLogged} setShow={setLoginShow} setUser={props.setUser} /> : <></>}
      {showLogin == 2 ? <SignupPage isLogged={props.isLogged} setShow={setLoginShow} /> : <></>}
      {showLogin == 3 ? <BookEntryPage isLogged={props.isLogged} setShow={setLoginShow} user={props.user} /> : <></>}

      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to={"/"}>

          <img
            className="nav-logo-img"
            alt="file never uploaded"
            src={logo}
            style={{ width: "316px" }}
          />
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Dropdown className="">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ left: "-188%" , top: "117%" }}>
            <Dropdown.Item as={Link} to={'/'}>
              <FontAwesomeIcon icon={faHome} size="lg" className="mr-2" />
                Home
            </Dropdown.Item>
            {!props.isLogged ? (
              <Dropdown.Item onClick={() => { setLoginShow(1) }}><FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />Signup/Login</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={logoutHandler}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
                Logout
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={() => { setLoginShow(3) }}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />Donate</Dropdown.Item>
            {props.isLogged ?
              <Dropdown.Item as={Link} to={'/profile'} >
                <FontAwesomeIcon icon={faIdBadge} size="lg" className="mr-2" />Profile</Dropdown.Item>
              : <></>}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    </>
  );
}
