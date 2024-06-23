import React from "react"
import { useRouter } from 'next/navigation';
import Cookies from "universal-cookie"
// import config from '../../next.config.js'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "next-themes";

export default function Signup(props) {
    const cookies = new Cookies();
    const { theme, setTheme } = useTheme();


    const displayEle = props.isLogin ? "none" : "block";
    let router= useRouter()

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        passwordconfirm: ""
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

        if (formData.password !== formData.passwordconfirm) {
            console.log("passwords do not match !!");
            props.showAlert("passwords do not match !", 2);
            return;
        }

        const email = formData.email;
        const username = formData.username;
        const password = formData.password;

        props.showAlert("Signing up...", 2);

        try{
        const response = await fetch(`${config.serverUrl}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
          });
      

          const data = await response.json();
          if (response.ok) {
            console.log("signup success");
            // console.log(data.accessToken);
            props.dismissToast();
            props.showAlert("Success", 1);

            cookies.set("accessToken", data.accessToken);
            cookies.set("refreshToken", data.refreshToken);
            cookies.set("userName", username);

            router.push('/loggedin')
          }  else {
            console.log("signup FAIL");
            // console.error(data.message);
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
            <form className="form" onSubmit={handleSubmit} id="signupForm">
                <div className="form-top-toggle">
                    <span className="form-switcher-disable" onClick={props.handleClick} >Login</span>
                    <button className="form-switcher-enable">Sign up</button>
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
                    type="email"
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
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
                <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="form--input"
                    name="passwordconfirm"
                    onChange={handleChange}
                    value={formData.passwordconfirm}
                    style={{color: props.themeColor? "white":"rgba(29, 33, 68, 0.8)", 
                    borderBottom: props.themeColor? "2px solid white": "2px solid rgba(29, 33, 68, 0.3)"}}
                />
                <br/>
                </div>
                <div className="googleButton">
                <button className="button-85" form="signupForm" >Submit</button>
                </div>
            </form>

        </div>
    )
}