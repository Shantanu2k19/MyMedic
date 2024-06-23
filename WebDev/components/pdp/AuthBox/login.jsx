'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "next-themes";
import React from "react"
import Cookies from "universal-cookie"
import { useRouter } from 'next/navigation';
// import config from '../../next.config.js'

export default function Login(props) {
    const { theme, setTheme } = useTheme();

    const cookies = new Cookies();
    let router= useRouter()

    const displayEle = props.isLogin ? "block" : "none";

    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = formData.username;
        const password = formData.password;

        props.showAlert("Verifying...", 2);

        try{
        const response = await fetch(`${config.serverUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });

          const data = await response.json();
          if (response.ok) {
            console.log("logged in success");
            props.dismissToast();
            props.showAlert("Success", 1);

            cookies.set("accessToken", data.accessToken);
            cookies.set("refreshToken", data.refreshToken);
            cookies.set("userName", username);

            router.push('/loggedin')
          } else {
            console.log("log in FAIL");
            props.dismissToast();
            props.showAlert(data.message, 3);
          }
        }
        catch{
            props.dismissToast();
            props.showAlert("Cannot connect to server!", 3);
        }

    };

    return (
        <div className="form-container" style={{ display: displayEle }}>
            <form className="form" onSubmit={handleSubmit} id="loginForm">
                <div className="form-top-toggle">
                    <button className="form-switcher-enable">Login</button>
                    <span className="form-switcher-disable" onClick={props.handleClick}>Sign up</span>
                </div>
                <div className="form-inner-content">
                <input
                    type="username"
                    placeholder="username"
                    className="form--input"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    style={{color: props.themeColor? "white":"rgba(29, 33, 68, 0.8)", 
                    borderBottom: props.themeColor? "2px solid white": "2px solid rgba(29, 33, 68, 0.3)"}}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    style={{color: props.themeColor? "white":"rgba(29, 33, 68, 0.8)", 
                    borderBottom: props.themeColor? "2px solid white": "2px solid rgba(29, 33, 68, 0.3)"}}
                />
                <br/>                
                </div>
                <div className="googleButton">
                <button className="button-85" role="button" form="loginForm">Submit</button>
                </div>

            </form>

        </div>
    )
}