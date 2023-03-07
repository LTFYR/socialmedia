import React, { useState, useEffect } from "react";
import "../style/register.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/actions/auth";

const Register = () => {
  const { auth, notfication } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inititalState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [user, setUser] = useState(inititalState);
  const { fullname, username, email, password, confirm_password } = user;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(register(user));
    navigate("/login");
  };

  // useEffect(() => {
  //   if (auth.token) navigate("/");
  // }, [auth.token, navigate]);
  return (
    <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">InstaBook</h1>
          <p>Sign up to see photos and videos from your friends.</p>
          <button>
            <i className="fab fa-facebook-square"></i> Log in with Facebook
          </button>
          <div>
            <p>OR</p>
          </div>
        </div>
        <div className="container">
          <form onSubmit={handleLogin}>
            <input
              onChange={handleInput}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Mobile Number or Email"
              style={{
                backgroundColor: `${notfication.email ? "#f0d0ce" : ""}`,
              }}
            />
            <p style={{ fontSize: "12px", color: "red" }}>
              {notfication.email ? notfication.email : ""}
            </p>
            <input
              onChange={handleInput}
              value={fullname}
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              style={{
                backgroundColor: `${notfication.fullname ? "#f0d0ce" : ""}`,
              }}
            />
            <p style={{ fontSize: "12px", color: "red" }}>
              {notfication.fullname ? notfication.fullname : ""}
            </p>
            <input
              onChange={handleInput}
              value={username.toLowerCase().replace(/ /g, "")}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              style={{
                backgroundColor: `${notfication.username ? "#f0d0ce" : ""}`,
              }}
            />
            <p style={{ fontSize: "12px", color: "red" }}>
              {notfication.username ? notfication.username : ""}
            </p>
            <input
              onChange={handleInput}
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              style={{
                backgroundColor: `${notfication.password ? "#f0d0ce" : ""}`,
              }}
            />
            <p style={{ fontSize: "12px", color: "red" }}>
              {notfication.password ? notfication.password : ""}
            </p>
            <input
              onChange={handleInput}
              value={confirm_password}
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm your password"
              style={{
                backgroundColor: `${
                  notfication.confirm_password ? "#f0d0ce" : ""
                }`,
              }}
            />
            <p style={{ fontSize: "12px", color: "red" }}>
              {notfication.confirm_password ? notfication.confirm_password : ""}
            </p>
            <div className="gender">
              <label htmlFor="male">
                Male:{" "}
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  defaultChecked
                  onChange={handleInput}
                />
              </label>

              <label htmlFor="female">
                Female:{" "}
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleInput}
                />
              </label>

              <label htmlFor="other">
                Other:{" "}
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  onChange={handleInput}
                />
              </label>
            </div>
            <button>Sign up</button>
          </form>

          <ul>
            <li>By signing up, you agree to our</li>
            <li>
              <Link to="/">Terms</Link>
            </li>
            <li>
              <a href="">Data Policy</a>
            </li>
            <li>and</li>
            <li>
              <a href="">Cookies Policy</a> .
            </li>
          </ul>
        </div>
      </div>
      <div className="option">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      <div className="otherapps">
        <p>Get the app.</p>
        <button type="button">
          <i className="fab fa-apple"></i> App Store
        </button>
        <button type="button">
          <i className="fab fa-google-play"></i> Google Play
        </button>
      </div>
      <div className="footer">
        <ul>
          <li>
            <a href="">ABOUT</a>
          </li>
          <li>
            <a href="">HELP</a>
          </li>
          <li>
            <a href="">PRESS</a>
          </li>
          <li>
            <a href="">API</a>
          </li>
          <li>
            <a href="">JOBS</a>
          </li>
          <li>
            <a href="">PRIVACY</a>
          </li>
          <li>
            <a href="">TEMS</a>
          </li>
          <li>
            <a href="">LOCATIONS</a>
          </li>
          <li>
            <a href="">TOP ACCOUNTS</a>
          </li>
          <li>
            <a href="">HASHTAGS</a>
          </li>
          <li>
            <a href="">LANGUAGE</a>
          </li>
        </ul>
        <p>© 2020 PICTUREGRAM</p>
      </div>
    </main>
  );
};

export default Register;
