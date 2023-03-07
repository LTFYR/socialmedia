import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Notification from "./components/NotFound/Notification/Notification";
import PageRender from "./custom/Router/PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import ProtectedRouter from "./custom/Router/ProtectedRouter";
import { useEffect, useState } from "react";
import { refreshToken } from "./redux/actions/auth";
import axios from "axios";
import Register from "./pages/register";
import Left from "./components/Navbar/Left";
import Right from "./components/Navbar/Right";
import Status from "./components/Modal/status";
import { getPosts } from "./redux/actions/postAction";
import { suggestionUsers } from "./redux/actions/suggestionUsersAction";

function App() {
  const { auth, status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());

    localStorage.getItem("login");
  }, [dispatch]);

  const login = localStorage.getItem("login");
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("login")) || [];
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(suggestionUsers(auth.token));
    }
  }, [dispatch, auth.token]);
  return (
    <BrowserRouter>
      <input type="checkbox" id="theme" />
      <div class={`main ${(status || modal) && "redux-modal"}`}>
        <div className="mycontainer">
          <div className="main">
            <Notification />
            <Left />
            {status && <Status />}
            <Routes>
              <Route
                index
                path="/"
                element={auth.token ? <Home /> : <Login />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/:page" element={<PageRender />} />
              <Route path="/:page/:id" element={<PageRender />} />
              <Route path="/profile/_id" element={<PageRender />} />
            </Routes>
            <Right auth={auth} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
