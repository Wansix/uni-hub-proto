import React from "react";
import { useState, useEffect } from "react";

const kaikasApi = require("../api/kaikasApi.js");
const unihubNFTApi = require("../api/unihubNFTApi.js");
const mongoDBApi = require("../api/mongoDBApi.js");

const DEFAULT_ADDRESS = "0x00";

export const Profile = () => {
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [profileImgUrl, setProfileImgUrl] = useState(
    "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F1927025491-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F26RjBfFzFVOGIuZIvCnv%252Ficon%252Fd8iMGULLDXKhLrDi9c8X%252FKakaoTalk_20220714_212558110.png%3Falt%3Dmedia%26token%3D1b215d19-0cdd-4ae8-b626-cd48c5f648b1"
  );
  const [nickName, setNickName] = useState("nick");

  // 지갑이 언락되어있고, 연결 안되어있을 때 연결 시도
  useEffect(() => {
    kaikasApi.isUnlocked().then((isUnlocked) => {
      if (isUnlocked === true) {
        kaikasApi.isEnabled().then((isEnabled) => {
          connetWallet();
        });
      }
    });
  }, []);

  const test = async () => {
    await kaikasApi.test();
  };

  const getProfileImgUrl = async () => {
    unihubNFTApi.tokenURI(setProfileImgUrl);
  };

  const connetWallet = async () => {
    const account = await kaikasApi.connectKaikasWallet();
    if (account) {
      const frontAccount = account.substr(0, 4);
      const backAccount = account.substr(-4);
      const viewAccount = frontAccount + "..." + backAccount;
      setMyAddress(viewAccount);

      getProfileImgUrl();
    }
  };

  return (
    <div className="profile">
      <div className="wallet-connect">
        <div>
          <button onClick={connetWallet}>connect</button>
          <button onClick={test}>test</button>
        </div>

        <span>{myAddress}</span>
      </div>
      <div className="profile__profile">
        <img src={profileImgUrl}></img>
        <div className="profile__Info">
          <span>닉네임 : {nickName}</span>
          <span>씨앗 : {nickName}</span>
          <span>허브 : {nickName}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
