import React from "react";
import { useRouter } from "next/navigation";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
// import config from "../../next.config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GoogLogin(prop) {
  // console.log(theme)
  const gtheme = prop.theme === "dark" ? "filled_black" : "outline";
  let router = useRouter();
  const cookies = new Cookies();

  let backg =
    prop.theme === "light" ? "rgba(241,242,246, 0.3)" : "rgba(41, 39, 39, 0.3)";
  let boxSh =
    prop.theme === "light" ? "0 5px 30px #dadee8" : "0 5px 30px black";

  // console.log(backg, boxSh);

  const loginStyle = {
    backgroundColor: backg,
    boxShadow: boxSh,
  };

  async function handleCallbackResponse(googResponse) {
    console.log("Sigin with google");
    // console.log("encoded\n",gResponse.credential);

    var user_obj = jwt(googResponse.credential);
    console.log(user_obj.picture);

    const email = user_obj.email;
    const username = user_obj.given_name + (user_obj.nbf % 10000);
    // const userImg = user_obj.picture;

    prop.showAlert("Verifying with Google...", 2);

    try {
      const gResponse = await fetch(
        `${config.serverUrl}/users/signupWithGoogle`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email }),
        }
      );

      const data = await gResponse.json();
      if (gResponse.ok) {
        console.log("signup success");
        // console.log(data.accessToken);
        prop.dismissToast();
        prop.showAlert("Success", 1);

        cookies.set("accessToken", data.accessToken);
        cookies.set("refreshToken", data.refreshToken);
        cookies.set("userName", data.uname);
        cookies.set("userPic", user_obj.picture);
        router.push("/loggedin");
      } else {
        console.log("signup FAIL");
        prop.dismissToast();
        prop.showAlert(data.message, 2);
        console.error(data.message);
      }
    } catch {
      prop.dismissToast();
      prop.showAlert("Cannot connect to servers!!", 2);
    }
  }

  React.useEffect(() => {
    google.accounts.id.initialize({
      client_id:
      `${config.googleKey}`,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: gtheme,
      size: "large",
      width: "250px",
    });

    google.accounts.id.prompt();
  }, [prop.theme]);

  return <></>;
}
