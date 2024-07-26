import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
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
import sample from "./images/bg_video_csi.mp4";
import logo from "./images/arahas-logo.webp";
import { NavLink } from "react-router-dom";
import loding_ani from "./animations/loading.json";
import "./LoginModule.css"; // Import the CSS file
import RegisterModal from "./RegisterModel";

const Login = () => {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [deptToggle, setDeptToggle] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
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

  const sampleCredentials = {
    name: "arahas",
    number: "911234567890",
    otp: "1234",
  };

  const loginotpuser = () => {
    if (
      name === sampleCredentials.name &&
      number === sampleCredentials.number &&
      otp === sampleCredentials.otp
    ) {
      setLoading(true);
      setTimeout(() => {
        navigate("/csi/overall-score");
      }, 1000);
    } else {
      setLoading(false);
      alert("Invalid credentials");
    }
  };

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  const handlePhoneNumberChange = (value) => {
    setNumber(value);
    console.log(value);
  };

  const handleLoginResponse = (response) => {
    if (response.status === 201) {
      localStorage.setItem("userdatatoken", response.data.result.token);
      const { department } = inpval;
      setLoading(true); // Set loading to true upon successful authentication
      setTimeout(() => {
        // Simulating delay for demonstration purpose
        if (department === "Electricity") {
          navigate("/csi/electricity");
        } else if (department === "Jal-kal") {
          navigate("/csi/jal-kal");
        } else if (department === "Housing") {
          navigate("/csi/housing");
        } else if (department === "Land_management") {
          navigate("/csi/land-management");
        } else if (department === "Urban_heritage") {
          navigate("/csi/urban-heritage");
        } else if (department === "Environment") {
          navigate("/csi/environment");
        } else {
          navigate("/csi/tourism");
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
          "https://arahas-data-upload-back.onrender.com/login",
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
        <header
          className="header"
          style={{
            height: "4vw",
            display: "flex",
            alignItems: "center",
            padding: "1vw",
          }}
        >
          <img src={logo} className="login-logo" alt="Logo" />
          <nav className="nav">
            <NavLink to="kyc">
              <Button
                variant="contained"
                style={{
                  padding: "0.5vw 1vw",
                  fontSize: "0.8vw",
                  backgroundColor: "#00A269",
                }}
              >
                Know Your City
              </Button>
            </NavLink>
            {/* <NavLink to="admin">
              <Button
                variant="contained"
                color="warning"
                style={{ padding: "0.5vw 1vw", fontSize: "0.8vw" }}
              >
                City Report Card
              </Button>
            </NavLink> */}
            <Button
              variant="contained"
              color="warning"
              className={!loginToggle ? "show" : "hidden"}
              onClick={toggleLogin}
              style={{
                padding: "0.5vw 1vw",
                fontSize: "0.8vw",
                backgroundColor: "#00A269",
              }}
            >
              Login
            </Button>
          </nav>
        </header>
        <main className="main-content">
          <h1 className="title">
            <span className="highlight">City</span>&nbsp;Sustainability Index
          </h1>
          <div className={`login-box ${loginToggle ? "login-box-open" : ""}`}>
            <Button className="close-button" onClick={toggleLogin}>
              <span className="pi pi-times"></span>
            </Button>
            <div className="custom-toggle">
              <Button
                variant={deptToggle ? "outlined" : "contained"}
                style={{
                  color: "#00A269",
                  backgroundColor: deptToggle ? "transparent" : "#A9F3E0",
                  borderColor: "#00A269",
                  borderRadius: 0,
                }}
                onClick={() => setDeptToggle(false)}
                className={!deptToggle ? "active" : ""}
              >
                Citizen Login
              </Button>
              <Button
                variant={deptToggle ? "contained" : "outlined"}
                style={{
                  color: "#00A269",
                  backgroundColor: deptToggle ? "#A9F3E0" : "transparent",
                  borderColor: "#00A269",
                  borderRadius: 0,
                }}
                onClick={() => setDeptToggle(true)}
                className={deptToggle ? "active" : ""}
              >
                Department Login
              </Button>
            </div>
            {deptToggle && (
              <>
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
                    <MenuItem value="Environment">Environment</MenuItem>
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
                      color: "#00A269",
                    }}
                  />
                  Remember Me
                  <a href="#">Forgotten Password?</a>
                </div>
                {error && <p className="error">{error}</p>}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#00A269" }}
                  onClick={loginuser}
                  disabled={loading}
                >
                  {loading ? <Lottie animationData={loding_ani} /> : "Login"}
                </Button>
              </>
            )}
            {!deptToggle && (
              <>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                {/* <TextField
                  label="Phone Number"
                  variant="outlined"
                  name="number"
                  fullWidth
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                /> */}
                <PhoneInput
                  name="number"
                  placeholder="Enter Phone Number"
                  value={number}
                  onChange={handlePhoneNumberChange}
                  country="in"
                  className="phone-input"
                />

                <div className="otp-input">
                  <p className="otp-label">Enter OTP</p>
                  <MuiOtpInput value={otp} onChange={handleChange} />
                </div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#00A269" }}
                  onClick={loginotpuser}
                  disabled={loading}
                >
                  {loading ? <Lottie animationData={loding_ani} /> : "Submit"}
                </Button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
