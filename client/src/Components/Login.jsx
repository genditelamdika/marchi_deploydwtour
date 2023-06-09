import { Button, Modal, Form } from "react-bootstrap";
import Palm from "../assets/images/iconPalm.png";
import Hibiscus from "../assets/images/iconHibiscus.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context/userContext";
import { useCustomMutation } from "../config/query";
import { login } from "../utils/auth";

import { setAuthToken } from "../config/api";
import Swal from "sweetalert2";

function Login({ show, handleCloseLogin }) {
  const navigate = useNavigate();
  const loginMutation = useCustomMutation("login", login);

  const [_, dispatch] = useContext(UserContext);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = formLogin

  const OnHandlerChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginMutation.mutateAsync(formLogin);
      if (response) {
        console.log(response?.email, "ini dari login.js");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response,
        });

        setAuthToken(response?.token);

        console.log(response?.role);

        if (response?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not registered!",
      });
    }
    handleCloseLogin();
  };

  return (
    <Modal show={show} onHide={() => handleCloseLogin()} className="TextLogin">
      <img src={Palm} alt="" className="stylePalm" />
      <img src={Hibiscus} alt="" className="position-absolute styleHibiscus" />

      <Modal.Title
        className="text-center mt-5 TextLogin"
        style={{ fontSize: "36px" }}
      >
        Login
      </Modal.Title>

      <Modal.Body className="p-5">
        <Form onSubmit={(e) => handleLogin(e)}>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              autoFocus
              required
              onChange={OnHandlerChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              onChange={OnHandlerChange}
            />
          </Form.Group>
          <Button type="submit" className="Login">
            Login
          </Button>
        </Form>
      </Modal.Body>

      <p className="text-center blurText">
        Don't have an account? Click <span className="otherblurtext">Here</span>{" "}
      </p>
    </Modal>
  );
}

export default Login;
