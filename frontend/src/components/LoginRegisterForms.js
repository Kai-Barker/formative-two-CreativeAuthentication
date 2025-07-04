//Imports
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./css/LoginForm.css";
import axios from "axios";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import WeaponChoice from "../components/WeaponChoice";

const mockDatabase = [
  { email: "user1@example.com", password: "password123" },
  { email: "user2@example.com", password: "securepass456" },
  { email: "user3@example.com", password: "mypassword789" },
  { email: "user4@example.com", password: "adminpass321" },
  { email: "user5@example.com", password: "guestpass654" },
];

function LoginRegisterForm({ isLogin = true }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [renderError, setRenderError] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("Partner");
  const [selectedRoom, setSelectedRoom] = useState("Bedroom");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      //Login
      try {
        const res = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password,
          weapon: selectedWeapon,
          victim: selectedTarget,
          murderLocation: selectedRoom
        }, {
              withCredentials:true
            });
        setError(res.data.message);
        setRenderError(true);
        setIsError(false);
        navigate("/");
        window.location.reload();
      } catch (error) {
        setError("Error logging in");
        setRenderError(true);
        setIsError(true);
      }
    } else {
      //Register
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setRenderError(true);
        setIsError(true);
        return;
      } else if (!selectedWeapon) {
        setError("Please select a weapon");
        setRenderError(true);
        setIsError(true);
        return;
      } 
      else if (!selectedTarget) {
        setError("Please select a target");
        setRenderError(true);
        setIsError(true);
        return;
      }
      else if (!selectedRoom) {
        setError("Please select a room");
        setRenderError(true);
        setIsError(true);
        return;
      }else {
        //Success
        console.log("Selected Weapon:", selectedWeapon);

        console.log("Sending registration data:", {
          email,
          password,
          weapon: selectedWeapon,
          victim: selectedTarget,
          murderLocation: selectedRoom
        });

        try {
          const response = await axios.post(
            "http://localhost:5000/api/users/register",
            {
              email,
              password,
              weapon: selectedWeapon,
              victim: selectedTarget,
              murderLocation: selectedRoom
            }
          );
          console.log("User registered!" + response.data);
          setError("Success!");
          setRenderError(true);
          setIsError(false);
        } catch (error) {
          setError("Error Creating User");
          setRenderError(true);
          setIsError(false);
          console.error("Error registering user:", error);
        }
        //Do logic to store user
        console.log({ email, password });
      }
    }
  };
  function RenderErrorMessage(isError) {
    if (isError) {
      return <p className="error-message error">{error}</p>;
    } else {
      return <p className="error-message success">{error}</p>;
    }
  }

  function RenderConfirm() {
    return (
      <FloatingLabel
        controlId="floatingConfirmPassword"
        label="Confirm Password"
        className="form-field-floating"
      >
        <Form.Control
          type="password"
          placeholder="  Confirm Password"
          className="form-field-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />
      </FloatingLabel>
    );
  }
  function RenderCombination() {
    if (isLogin) {
      return <h1 className="combination-title">CHOOSE YOUR WEAPON</h1>;
    } else {
      return <h1 className="combination-title">CHOOSE YOUR WEAPON</h1>;
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col md={12}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="form-field-floating"
            >
              <Form.Control
                className="form-field-control"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="form-field-floating"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-field-control"
                required={true}
              />
            </FloatingLabel>

            {isLogin ? null : RenderConfirm()}
            {RenderCombination()}
            {/* If login screen, do not show the confirm password field  */}
            {renderError ? RenderErrorMessage(isError) : null}
            <Row>
              <WeaponChoice onWeaponSelect={setSelectedWeapon} />
              <h4 className="form-select-title">Who would you like to kill with your weapon?</h4>
              <Form.Select className="form-select-bar" onChange={(e) => {setSelectedTarget(e.target.value)}}>
                <option>Partner</option>
                <option>Employer</option>
                <option>Colleague</option>
                <option>Politician</option>
                <option>Friend</option>
                <option>Enemy</option>
                <option>Student</option>
                <option>Wife</option>
                <option>Husband</option>
                <option>Boyfriend</option>
                <option>Girlfriend</option>
                <option>Best Friend</option>
                <option>Acquaintance</option>
                <option>Annoyance</option>
                <option>Pet</option>
                <option>Millionaire</option>
                <option>Billionaire</option>
                <option>Celebrity</option>
              </Form.Select>

              <h4 className="form-select-title">Where would you kill them?</h4>
              <Form.Select className="form-select-bar" onChange={(e) => {setSelectedRoom(e.target.value)}}>
                <option>Bedroom</option>
                <option>Bathroom</option>
                <option>Office</option>
                <option>Kitchen</option>
                <option>Basement</option>
                <option>Club</option>
                <option>Hallway</option>
                <option>Outside</option>
                <option>Gym</option>
                <option>Stadium</option>
                <option>Arena</option>
                <option>Hall</option>
              </Form.Select>

              <Col md={{ span: 6, offset: 3 }} xs={12}>
                <Button className="login-submit" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
export default LoginRegisterForm;
