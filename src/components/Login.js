import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material"; // Import Material-UI components
import logo from "./images/arahas-logo.webp";
import RegisterModal from "./RegisterModel";
import Lottie from "lottie-react";
import file_animation from "./animations/file-processing.json";
import loding_ani from "./animations/loading.json";
import Header from "./Header";

const Login = () => {
  const history = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
    department: "",
  });
  const [error, setError] = useState(""); // State to hold error message
  const [loading, setLoading] = useState(false); // State to manage loading

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
          history("/electricity");
        } else if (department === "Jal-kal") {
          history("/jal-kal");
        } else if (department === "Housing") {
          history("/housing");
        } else if (department === "Land_management") {
          history("/land-management");
        } else if (department ==="Urban_heritage") {
          history("/urban-heritage");
        }
        else{
          history("/tourism");
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
        const response = await axios.post("https://arahas-data-upload-back.onrender.com/login", {
          email,
          password,
          department,
        });
        handleLoginResponse(response);
      } catch (error) {
        console.error("Login Error:", error);
        setError("Invalid credentials. Please try again.");
        setLoading(false); // Reset loading if authentication fails
      }
    }
  };

  // const handleDemoRequest = () => {
  //   setShowRegisterModal(true); // Show the register modal when requesting demo
  // };

  return (
    <>
      <section className="home">
        <Header/>
        <div className="main-container">
          <div className="ani">
            <Lottie
              animationData={file_animation}
              style={{ width: "50vw", height: "40vw" }}
            />
          </div>

          <div className="form-container">
            <div className="form_data">
              <div className="form_heading">
                <h1>Login</h1>
              </div>

              <form>
                <div className="form_input">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={inpval.email}
                    id="email"
                    onChange={setVal}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="password">Password</label>
                  <div className="two">
                    <input
                      type={!passShow ? "password" : "text"}
                      name="password"
                      id="password"
                      onChange={setVal}
                      value={inpval.password}
                      placeholder="Enter your password"
                    />
                    <div
                      className="showpass"
                      onClick={() => setPassShow(!passShow)}
                    >
                      {!passShow ? (
                        <Visibility style={{ fontSize: "1.3vw" }} />
                      ) : (
                        <VisibilityOff style={{ fontSize: "1.3vw" }} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="dropdown-login">
                  <label htmlFor="department">Department</label>
                  <Select
                    name="department"
                    id="department"
                    value={inpval.department}
                    onChange={setVal}
                    className="dropdown-menu"
                    displayEmpty
                    style={{height:"3.5vw", padding:"0vw"}}
                  >
                    <MenuItem value="" disabled>
                      Select your department
                    </MenuItem>
                    <MenuItem value="Electricity">Electricity</MenuItem>
                    <MenuItem value="Jal-kal">Jal-Kal Vibhag </MenuItem>
                    <MenuItem value="Housing">Housing Department</MenuItem>
                    <MenuItem value="Land_management">Land Management</MenuItem>
                    <MenuItem value="Urban-Heritage">Urban Heritage</MenuItem>
                    <MenuItem value="Tourism">Tourism</MenuItem>
                  </Select>
                </div>
                <button className="btn" onClick={loginuser}>
                  Login
                </button>
                {error && <p className="error-message">{error}</p>}
              </form>
            </div>
          </div>
        </div>
        {/* Conditional rendering for loading overlay */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-text">
              <Lottie
                animationData={loding_ani}
                style={{ width: "40vw", height: "20vw" }}
              />
            </div>
          </div>
        )}
      </section>
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </>
  );
};

export default Login;
