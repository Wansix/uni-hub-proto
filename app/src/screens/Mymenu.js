import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };
const unihubServerURL = process.env.REACT_APP_UNIHUB_SERVER_URL;

const kaikasApi = require("../api/kaikasApi.js");
const unihubNFTApi = require("../api/unihubNFTApi.js");

export const Mymenu = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [NFTList, setNFTList] = useState([]);
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

  const getUserInfo = async (setUserInfo) => {
    return await unihubNFTApi.getUserInfo(setUserInfo);
  };

  const getNFTList = () => {
    const address = unihubNFTApi.getCurrentAccount();
    console.log("NFTList address", address);

    if (address) {
      console.log("connect!");
      unihubNFTApi.getBalanceOf(address).then(async (balance) => {
        setUserBalance(balance);
        console.log("user Balance", balance);
        const list = [];
        const nftList = [];
        for (let i = 0; i < balance; i++) {
          await unihubNFTApi.tokenOfOwnerByIndex(address, i).then((tokenId) => {
            // console.log("tokenId:", i, tokenId);
            if (nftList[i]) {
              console.log("중복");
              return;
            } else {
            }

            nftList[i] = Number(tokenId);
          });
        }

        // console.log(nftList);

        list.push(
          <div key={0} className="NFTList__item">
            <label>
              <input
                type="radio"
                name="tokenId"
                value={0}
                defaultChecked
              ></input>
              <img
                src={"https://project-lion.vercel.app/images/loading.png"}
              ></img>
            </label>
          </div>
        );

        let selectedTokenId;
        const profileRegistered = localStorage.getItem("userProfileRegistered");

        console.log("userInfo.profileNFTid", userInfo.profileNFTid);
        if (profileRegistered) {
          selectedTokenId = localStorage.getItem("userNFTid");
          console.log("select", selectedTokenId);
        }

        for (let index = 0; index < nftList.length; index++) {
          await unihubNFTApi.getTokenInfoJson(nftList[index]).then((data) => {
            // console.log("json data", data);
            // console.log("json data", data["name"]);
            if (selectedTokenId == nftList[index]) {
              list.push(
                <div key={index + 1} className="NFTList__item">
                  <label>
                    <input
                      type="radio"
                      name="tokenId"
                      value={nftList[index]}
                      defaultChecked
                    ></input>
                    <img src={data.image}></img>
                  </label>
                </div>
              );
            } else {
              list.push(
                <div key={index + 1} className="NFTList__item">
                  <label>
                    <input
                      type="radio"
                      name="tokenId"
                      value={nftList[index]}
                    ></input>
                    <img src={data.image}></img>
                  </label>
                </div>
              );
            }
          });
        }

        // console.log("list", nftList);
        setNFTList(list);
      });
    }
  };

  useEffect(() => {
    getUserInfo(setUserInfo);
    getNFTList();
  }, []);

  let content = null;
  if (userInfo.profile_registered) {
    content = (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const nickName = event.target.nickName.value;
          const profileId = event.target.tokenId.value;

          console.log("프로필 수정", nickName, profileId);

          unihubNFTApi.getTokenInfoJson(profileId).then((data) => {
            let tempUserInfo = userInfo;
            tempUserInfo["name"] = nickName;
            tempUserInfo["profileNFTid"] = profileId;

            tempUserInfo["profileImgUrl"] = data.image;

            console.log("temp", tempUserInfo);
            unihubNFTApi.updateUserInfo(tempUserInfo);
            localStorage.clear();
            window.location.href = "/mymenu";
            window.location.reload();
          });
        }}
      >
        <div className="myMenu-registerForm__item">{NFTList}</div>
        <div className="myMenu-registerForm__item">
          <input type="text" name="nickName" defaultValue={userInfo.name} />
        </div>
        <input type="submit" value="수정"></input>
      </form>
    );
  } else {
    content = (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const nickName = event.target.nickName.value;
          const profileId = event.target.tokenId.value;

          console.log("등록", nickName, profileId);
          unihubNFTApi.registerUserInfo(nickName, profileId);
          window.location.href = "/mymenu";
          window.location.reload();
        }}
      >
        <div className="myMenu-registerForm__item">{NFTList}</div>
        <div className="myMenu-registerForm__item">
          <input type="text" name="nickName" placeholder="닉네임" required />
        </div>

        <input type="submit" value="등록"></input>
      </form>
    );
  }

  return (
    <div className="myMenu">
      <div className="myMenu-registerForm">
        <div className="myMenu-registerForm__header">
          <div>My NFT </div>
          <div>NFT 개수 {userBalance}</div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Mymenu;
