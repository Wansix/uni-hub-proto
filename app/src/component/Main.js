import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Community from "../screens/Community";
import WriteBoard from "../screens/WriteBoard";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Community/Write" element={<WriteBoard />} />
      </Routes>
    </div>
  );
};

export default Main;
