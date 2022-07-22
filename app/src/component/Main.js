import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Community from "../screens/Community";
import WriteBoard from "../screens/WriteBoard";
import CommunityDetail from "../screens/CommunityDetail";
import Mint from "../screens/Mint";
import Mymenu from "../screens/Mymenu";

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mint" element={<Mint />} />
        <Route path="/Mymenu" element={<Mymenu />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Community/:id" element={<CommunityDetail />} />
        <Route path="/Community/Write" element={<WriteBoard />} />
      </Routes>
    </div>
  );
};

export default Main;
