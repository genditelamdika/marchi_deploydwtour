import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import Icon from "../assets/images/Icon.png";
import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import User from "../assets/images/User.png";
import { UserContext } from "../utils/context/userContext";
import { API, setAuthToken } from "../config/api";

function NavbarMenu() {
  const [show, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showReg, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  // const tourBookExists = !localStorage.getItem("tourBook");

  // const handleUser = () => {
  //   if (!localStorage.getItem("tourBook")) {
  //     navigate("/");
  //   }
  //   navigate("/Waiting");
  // };

  // // useEffect(() => {
  // //   if (!tourBookExists) {
  // //     navigate("/");
  // //   }
  // // }, [tourBookExists, navigate]);

  return (
    <>
      <Navbar className="backgroundNav">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={Icon} alt="logo" />
            </Link>
          </Navbar.Brand>
          {/* )
        ) } */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {state.isLogin === true ? (
            state.user.role === "admin" ? (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <NavDropdown title={<img src={User} alt="" />}>
                    <NavDropdown.Item href="/trip">trip</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            ) : (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="ms-auto"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <NavDropdown title={<img src={User} alt="" />}>
                    <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item
                      href={
                        !localStorage.getItem("tourBook") ? "/" : "/Waiting"
                      }
                    >
                      Pay
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            )
          ) : (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Button
                  variant="outline-light"
                  style={{
                    padding: "6px 23px",
                  }}
                  className="me-3 text-dark"
                  onClick={() => handleShowLogin()}
                >
                  Login
                </Button>
                <Button
                  variant=""
                  style={{
                    backgroundColor: "#FFAF00",
                    padding: "6px 23px",
                    color: "#fff",
                  }}
                  onClick={() => handleShow()}
                >
                  Register
                </Button>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <Register
        showReg={showReg}
        setShow={handleShow}
        handleClose={handleClose}
      />
      <Login
        show={show}
        setShowLogin={handleShowLogin}
        handleCloseLogin={handleCloseLogin}
      />
    </>
  );
}

export default NavbarMenu;
