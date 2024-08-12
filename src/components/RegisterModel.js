import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./RegisterModel.css";

const RegisterModal = ({ onClose }) => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    fname: "",
    department: "", // Change here
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { fname, department, email, password, cpassword } = inpval;
    if (fname === "") {
      alert("Please Enter Your Full Name");
    } else if (email === "") {
      alert("Please Enter Your Email Address");
    } else if (!email.includes("@")) {
      alert("Please Enter Valid Email Address");
    } else if (password === "") {
      alert("Please Enter Your Password ");
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long");
    } else if (cpassword === "") {
      alert("Please Enter Your Confirm Password ");
    } else if (cpassword.length < 6) {
      alert("Password must be at least 6 characters long");
    } else if (password !== cpassword) {
      alert("Password and Confirm Password do not match");
    } else {
      try {
        const response = await axios.post(
          "https://api-csi.arahas.com//register",
          {
            fname,
            department, // Change here
            email,
            password,

            password,
          }
        );
        if (response.status === 201) {
          alert("User Registration Successful");
          setInpval({
            fname: "",
            department: "", // Change here
            email: "",
            password: "",
            cpassword: "",
          });
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          <h5>X</h5>
        </span>
        <form>
          <h1>User Registration</h1>
          <div className="form_input">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={inpval.fname}
              placeholder="Enter Your Full Name"
              onChange={setVal}
            />
          </div>
          <div className="form_input">
            <label htmlFor="department">Department</label> {/* Change here */}
            <input
              type="text"
              name="department"
              id="department"
              value={inpval.department}
              placeholder="Enter Your Department"
              onChange={setVal}
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={inpval.email}
              placeholder="Enter Your Email Address"
              onChange={setVal}
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Create Password</label>
            <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                name="password"
                id="password"
                value={inpval.password}
                onChange={setVal}
                placeholder="Create Password"
              />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? (
                  <Visibility style={{ fontSize: "1.6vw" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "1.6vw" }} />
                )}
              </div>
            </div>
          </div>
          <div className="form_input">
            <label htmlFor="password">Confirm Password</label>
            <div className="two">
              <input
                type={!cpassShow ? "password" : "text"}
                name="cpassword"
                id="cpassword"
                onChange={setVal}
                value={inpval.cpassword}
                placeholder="Enter Password to Confirm "
              />
              <div
                className="showpass"
                onClick={() => setcPassShow(!cpassShow)}
              >
                {!cpassShow ? (
                  <Visibility style={{ fontSize: "1.6vw" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "1.6vw" }} />
                )}
              </div>
            </div>
          </div>
          <button className="btn" onClick={addUserdata}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
