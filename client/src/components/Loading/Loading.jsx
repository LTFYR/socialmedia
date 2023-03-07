import React from "react";
import "../Loading/Loading.css";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <>
      <div class="firstline">
        <div class="shapes1"></div>
        <div class="shapes2"></div>
        <div class="shapes3"></div>
        <div class="shapes4"></div>
        <div class="shapes5"></div>
      </div>
      <div class="secondline">
        <div class="loading">Loading</div>
      </div>
      <div class="thirdline">
        <div class="shapes6"></div>
        <div class="shapes7"></div>
        <div class="shapes8"></div>
        <div class="shapes9"></div>
        <div class="shapes10"></div>
      </div>
    </>
  );
};

export default Loading;
