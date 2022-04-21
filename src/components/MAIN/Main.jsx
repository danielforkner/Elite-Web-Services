import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import AllUsers from "./AllUsers";
import ProfileContactInfo from "../SIDEBAR/ProfileContactInfo";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/users/" element={<AllUsers />}></Route>
        <Route path="/" element={<Products />}></Route>
        <Route path="/contactinfo" element={<ProfileContactInfo />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
