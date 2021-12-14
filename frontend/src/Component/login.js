import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [users, setusers] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useNavigate();

  useEffect(async () => {
    await fetch("http://localhost:8000/users")
      .then((e) => e.json())
      .then((ele) => setusers(ele));
  }, []);

  const responseGoogle = (response) => {
    if (users) {
      users.map((user) => {
        console.log(user.email, response);
        if (user.email == response.profileObj.email) {
          history(`/users/${email}`);
        }
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "password") {
      setpassword(e.target.password);
    } else {
      setemail(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    if (users) {
      users.map((user) => {
        if (user.email && user.password) {
          if (email === user.email && password === user.password) {
            history(`/users/${email}`);
          }
        }
      });
    }
  };

  const componentClicked = (e) => {
    // console.log(e);
  };

  const responseFacebook = (e) => {
    if (users) {
      users.map((user) => {
        if (user.email == e.email) {
          history(`/users/${email}`);
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default Login;
