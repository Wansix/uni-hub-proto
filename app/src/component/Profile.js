import React from "react";
import { useState, useEffect } from "react";

const kaikasApi = require("../api/kaikasApi.js");
const unihubNFTApi = require("../api/unihubNFTApi.js");
const mongoDBApi = require("../api/mongoDBApi.js");

const DEFAULT_ADDRESS = "0x00";

export const Profile = () => {
  const [myViewAddress, setMyViewAddress] = useState(DEFAULT_ADDRESS);
  // const [profileImgUrl, setProfileImgUrl] = useState(
  //   "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F1927025491-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F26RjBfFzFVOGIuZIvCnv%252Ficon%252Fd8iMGULLDXKhLrDi9c8X%252FKakaoTalk_20220714_212558110.png%3Falt%3Dmedia%26token%3D1b215d19-0cdd-4ae8-b626-cd48c5f648b1"
  // );

  const [userInfo, setUserInfo] = useState({
    address: "",
    name: "",
    profileNFTid: 0,
    profileImgUrl:
      "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F1927025491-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F26RjBfFzFVOGIuZIvCnv%252Ficon%252Fd8iMGULLDXKhLrDi9c8X%252FKakaoTalk_20220714_212558110.png%3Falt%3Dmedia%26token%3D1b215d19-0cdd-4ae8-b626-cd48c5f648b1",
    seed: 0,
    claimHerb: 0,
    profile_registered: false,
  });

  const checkChangedAccount = () => {
    console.log("changedAccount");
    const address = localStorage.getItem("userADDRESS");
    if (window.klaytn.selectedAddress != address) {
      localStorage.clear();
      kaikasApi.autoConnectWallet(connectWallet);
      unihubNFTApi.getUserInfoFromAccount(setUserInfo);
      window.location.reload();
    }
    // localStorage.clear();
  };

  useEffect(() => {
    // console.log("useEffect");
    const address = localStorage.getItem("userADDRESS");
    kaikasApi.autoConnectWallet(connectWallet).then(() => {
      if (window.klaytn.selectedAddress != address) {
        localStorage.clear();
      }
      unihubNFTApi.getUserInfo(setUserInfo);
    });

    kaikasApi.changedAccount(checkChangedAccount);
  }, []);

  const test = async () => {
    await kaikasApi.test();
    unihubNFTApi.test();
  };

  // const getProfileImgUrl = () => {
  //   unihubNFTApi.getProfileImg(setProfileImgUrl);
  // };

  const connectWallet = async () => {
    const account = await kaikasApi.connectKaikasWallet();
    if (account) {
      const frontAccount = account.substr(0, 4);
      const backAccount = account.substr(-4);
      const viewAccount = frontAccount + "..." + backAccount;
      setMyViewAddress(viewAccount);

      // unihubNFTApi.getProfileImg(setProfileImgUrl);
      // getProfileImgUrl();
    }
  };

  return (
    <div className="profile">
      <div className="wallet-connect">
        <div>
          <button onClick={connectWallet}>connect</button>
          <button onClick={test}>test</button>
        </div>

        <span>{myViewAddress}</span>
      </div>
      <div className="profile__profile">
        <img src={userInfo.profileImgUrl}></img>
        <div className="profile__Info">
          <span>닉네임 : {userInfo.name}</span>
          <span>씨앗 : {userInfo.seed}</span>
          <span>허브 : {userInfo.claimHerb}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
