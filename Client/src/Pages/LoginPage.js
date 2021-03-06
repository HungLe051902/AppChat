import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  let navigate = useNavigate();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const login = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token", response.data.token);
        navigate("/dashboard");
        console.log({props});
        props.setupSocket();
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@gmail.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            ref={passwordRef}
          />
        </div>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
