import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { login } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [user, setUser] = useState(initialState);
  const { auth } = useSelector((state) => state);
  // console.log(auth.user.fullname);

  const { email, password } = user;

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(user));
  };
  return (
    <div className="login">
      {auth.user && <h1>{auth.user.fullname}</h1>}
      <form onSubmit={handleLogin}>
        <h3 className="title">InstaBook</h3>
        <div class="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleInput}
            value={email}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleInput}
            value={password}
            name="password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <p>
          New user ? <Link to="/register">Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
