import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import Lottie from "lottie-react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import sample from "./images/bg_video_vcsi.mp4";
import logo from "./images/arahas-logo.webp";
import { NavLink } from "react-router-dom";
import loding_ani from "./animations/loading.json";
import "./LoginPage/LoginModule.css"; // Import the CSS file

const Login_VCSI = () => {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
    department: "",
  });
  const [error, setError] = useState(""); // State to hold error message
  const [loading, setLoading] = useState(false); // State to manage loading
  const [loginToggle, setLoginToggle] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginResponse = (response) => {
    if (response.status === 201) {
      localStorage.setItem("userdatatoken", response.data.result.token);
      const { department } = inpval;
      setLoading(true); // Set loading to true upon successful authentication
      setTimeout(() => {
        // Simulating delay for demonstration purpose
        if (department === "Electricity") {
          navigate("/electricity");
        } else if (department === "Jal-kal") {
          navigate("/jal-kal");
        } else if (department === "Housing") {
          navigate("/housing");
        } else if (department === "Land_management") {
          navigate("/land-management");
        } else if (department === "Urban_heritage") {
          navigate("/urban-heritage");
        } else {
          navigate("/tourism");
        }
        setLoading(false); // Reset loading after redirection
        setInpval({ ...inpval, email: "", password: "", department: "" });
      }, 2000); // Change delay time as per your requirement
    }
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password, department } = inpval;
    if (email === "") {
      setError("Please Enter Your Email Address");
    } else if (!email.includes("@")) {
      setError("Please Enter Valid Email Address");
    } else if (password === "") {
      setError("Please Enter Your Password ");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (department === "") {
      setError("Please select your department");
    } else {
      try {
        setLoading(true); // Set loading to true during authentication
        const response = await axios.post(
          "https://api-csi.arahas.com/login",
          {
            email,
            password,
            department,
          }
        );
        handleLoginResponse(response);
      } catch (error) {
        console.error("Login Error:", error);
        setError("Invalid credentials. Please try again.");
        setLoading(false); // Reset loading if authentication fails
      }
    }
  };

  const toggleLogin = () => {
    setLoginToggle(!loginToggle);
  };

  return (
    <div className="login-container">
      {loading && (
        <div className="fullscreen-loading">
          <Lottie animationData={loding_ani} loop />
        </div>
      )}
      <div className="video-container">
        <video
          ref={videoRef}
          src={sample}
          className="video-bg"
          autoPlay
          loop
          muted
        />
      </div>
      <div className="content-container">
        <header className="header">
          <img src={logo} className="login-logo" alt="Logo" />
          <nav className="nav">
            <NavLink to="kyc">
              <Button variant="contained" color="warning">
                Know Your City
              </Button>
            </NavLink>
            <NavLink to="admin">
              <Button variant="contained" color="warning">
                City Report Card
              </Button>
            </NavLink>
            <Button
              variant="contained"
              color="warning"
              className={!loginToggle ? "show" : "hidden"}
              onClick={toggleLogin}
            >
              Login
            </Button>
          </nav>
        </header>
        <main className="main-content">
          <h1 className="title">
            <span className="highlight">Vedic City</span>&nbsp;Sustainability
            Index
          </h1>
          <div className={`login-box ${loginToggle ? "login-box-open" : ""}`}>
            <Button className="close-button" onClick={toggleLogin}>
              <span className="pi pi-times"></span>
            </Button>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={inpval.email}
              onChange={setVal}
              fullWidth
            />
            <TextField
              label="Password"
              type={passShow ? "text" : "password"}
              variant="outlined"
              name="password"
              value={inpval.password}
              onChange={setVal}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setPassShow(!passShow)}>
                    {passShow ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={inpval.department}
                onChange={setVal}
                label="Department"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Electricity">Electricity</MenuItem>
                <MenuItem value="Jal-kal">Jal-kal</MenuItem>
                <MenuItem value="Housing">Housing</MenuItem>
                <MenuItem value="Land_management">Land management</MenuItem>
                <MenuItem value="Urban_heritage">Urban heritage</MenuItem>
                <MenuItem value="Tourism">Tourism</MenuItem>
              </Select>
            </FormControl>
            <div className="remember-forgot">
              <Checkbox
                checked={true}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              Remember Me
              <a href="#">Forgotten Password?</a>
            </div>
            {error && <p className="error">{error}</p>}
            <Button
              variant="contained"
              color="warning"
              onClick={loginuser}
              disabled={loading}
            >
              {loading ? <Lottie animationData={loding_ani} /> : "Login"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login_VCSI;
