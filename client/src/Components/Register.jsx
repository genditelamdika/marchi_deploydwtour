import { Button, Modal, Form } from "react-bootstrap";
import Palm from "../assets/images/iconPalm.png";
import Hibiscus from "../assets/images/iconHibiscus.png";
import { useState } from "react";
import { useCustomMutation } from "../config/query";
import { register } from "../utils/auth";
import Swal from "sweetalert2";

const Register = ({ showReg, handleClose }) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const registerMutation = useCustomMutation("registUser", register);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(form);

    Swal.fire("Good job!", "Register Success");
    handleClose();
  };

  return (
    <Modal show={showReg} onHide={() => handleClose()} className="TextRegister">
      <img src={Palm} alt="" className="stylePalm" />
      <img src={Hibiscus} alt="" className="position-absolute styleHibiscus" />

      <Modal.Title
        className="text-center mt-5 p-3 TextRegister"
        style={{ fontSize: "36px" }}
      >
        Register
      </Modal.Title>

      <Modal.Body className="p-5">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Full Name</Form.Label>
            <Form.Control
              name="fullname"
              type="text"
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Phone</Form.Label>
            <Form.Control name="phone" type="text" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">Address</Form.Label>
            <Form.Control name="address" type="text" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="textLabelLogin">gender</Form.Label>
            <Form.Control name="gender" type="text" onChange={handleChange} />
          </Form.Group>

          <Button className="Reg" type="submit">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
