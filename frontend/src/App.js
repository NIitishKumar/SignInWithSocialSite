import logo from "./logo.svg";
import "./App.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const history = useNavigate();

  const responseGoogle = (response) => {
    axios({
      method: "post",
      url: "/google",
      data: response,
    });
    if (response.profileObj.email) {
      console.log(response);
      history(`/users/${email}`)
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.password);
    } else {
      setemail(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    axios(
      {
        method: "post",
        url: "/register",
        data: {
          name: name,
          email: email,
          password: password,
        },
      },
    );
    console.log(email);
    if (email) {
      history(`/users/${email}`)
    }
  };

  const componentClicked = (e) => {
    // console.log(e);
  };

  const responseFacebook = (e) => {
    console.log(e); //
    axios(
      {
        method: "post",
        url: "/facebook",
        data: e,
      }
    );
    if (email) {
      history(`/users/${e.email}`)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-group">
          <label for="fullName">Full Name</label>
          <input
            name="name"
            type="email"
            id="fullName"
            aria-describedby="emailHelp"
            class="form-control"
            onChange={handleChange}
            placeholder="Enter Full Name"
          ></input>
          {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group">
          <label for="inputEmail">Email address</label>
          <input
            name="email"
            type="email"
            id="inputEmail"
            aria-describedby="emailHelp"
            class="form-control"
            onChange={handleChange}
            placeholder="Enter Email"
          ></input>
          {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group">
          <label for="inputPassword">Enter Password</label>
          <input
            className="form-control"
            type="password"
            id="inputPassword"
            onChange={handleChange}
            name="password"
            placeholder="Enter Password"
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <GoogleLogin
          className="google-login"
          clientId="762114797443-j6dk98icvchbfgdimnr50vhpn7quaedo.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"http://localhost:3000"}
        />
        <FacebookLogin
          appId="4827137467350532"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          cssClass="facebook-btn"
        />
        <a href="/login">
        <button style={{color:'black'}} className="btn btn-dark" >Login</button></a>
      </header>
    </div>
  );
}

export default App;
