import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Select, MenuItem } from "@mui/material"; // Import Material-UI components
import Lottie from "lottie-react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import sample from './images/bg_video.mp4';
import style from './LoginModule.css';
import logo from "./images/arahas-logo.webp";
import { NavLink } from 'react-router-dom';
import loding_ani from "./animations/loading.json";
import sustain_city from "./images/city-sustain.jpg";
import Header from "./Header";
import RegisterModal from "./RegisterModel";

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
  const [loginToggle, setLoginToggle] = useState(false);

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
        } else if (department === "Urban_heritage") {
          history("/urban-heritage");
        } else {
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
    <>
			<div className='flex absolute'>
				<div className={`${style.vidContainer}`}>
					<video src={sample} className={style.videoBg} autoPlay loop muted />
				</div>
			</div>
			<div className='flex absolute w-full flex-column gap-5'>
				<div className='flex w-full justify-content-between h-4rem p-3'>
					<img src={logo} className='flex'></img>
					<div className='flex row justify-start gap-6 h-full 2 '>
						<NavLink to='kyc'>
							<Button label='Know Your City' severity='warning' text className='text-lg' />
						</NavLink>
						<Button label='Login' severity='warning' className={!loginToggle ? 'flex' : 'hidden'} onClick={toggleLogin} />
					</div>
				</div>
				<div className={`flex flex-column relative gap-3 p-4 h-full w-4 `}>
					<div className='flex font-semibold text-3xl gap-2'>
						<span className='text-orange-500'>City </span> Sustainability Index
					</div>
					<div className={`${style.loginBox} ${loginToggle ? style.loginBoxOpen : ''}`}>
						<Button
							text
							className={`${style.closeButton}`}
							severity='warning'
							onClick={toggleLogin}
							icon='pi pi-times'
						></Button>
						<FloatLabel className='w-10'>
							<InputText
								id='email'
								className={`p-inputtext-lg flex w-full border-x-none border-top-none bg-none ${style.InputText}`}
							/>
							<label className='text-black-alpha-90 font-medium' for='email'>
								Username
							</label>
						</FloatLabel>
						<FloatLabel className='w-10'>
							<InputText
								id='password'
								type='password'
								className={`p-inputtext-lg flex w-full border-x-none border-top-none bg-none ${style.InputText}`}
							/>
							<label className='text-black-alpha-90 font-medium' for='password'>
								Password
							</label>
						</FloatLabel>
						<FloatLabel className='w-10'>
							<InputText
								id='department'
								className={`p-inputtext-lg flex w-full border-x-none border-top-none bg-none ${style.InputText}`}
							/>
							<label className='text-black-alpha-90 font-medium' for='department'>
								Department
							</label>
						</FloatLabel>
						<div className='flex w-10 justify-content-between'>
							<div className='flex gap-2'>
								<Checkbox checked={true} /> Remember Me
							</div>
							<a className='flex'>Forgotten Password?</a>
						</div>

						<Button label='Login' severity='warning' />
					</div>
				</div>
			</div>
		</>
  );
};

export default Login;
