import React from "react";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import "../style/home.css";
import { useSelector, useDispatch } from "react-redux";
import loadinggif from "../images/loading-gif.gif";

const Home = () => {
  const { mainPosts } = useSelector((state) => state);
  return (
    <div className="homepage row">
      <div className="col-lg-12">
        <Status />
        {mainPosts.loading ? <img src={loadinggif} /> : <Posts />}
      </div>
    </div>
  );
};

export default Home;
