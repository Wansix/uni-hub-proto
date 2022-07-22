import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const TopNFT = () => {
  return (
    <div className="TopNFT-wrapper">
      <div className="TopNFT-header">
        <span>#</span>
        <span>name</span>
        <span>floor price</span>
        <span>volume</span>
      </div>
      <div className="TopNFT-content">
        <span>1</span>
        <img src="#"></img>
        <span>유니허브</span>
        <span>270 klay</span>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-wrapper__header"></div>
      <Tabs defaultActiveKey="topNFT" id="homeTap" className="mb-3">
        <Tab eventKey="topNFT" title="Top NFT">
          <TopNFT></TopNFT>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          {/* <TapContent></TapContent> */}
        </Tab>
        <Tab eventKey="contact" title="Contact">
          {/* <TapContent></TapContent> */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
