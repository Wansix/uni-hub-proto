require("dotenv").config();
const Caver = require("caver-js");
const contractABI = require("../abi/mintNFT.json");
const axios = require("axios");
const kaikasApi = require("./kaikasApi");
axios.defaults.withCredentials = false;

const contractAddress = process.env.REACT_APP_UNIHUB_NFT_CONTRACT;
const unihubServerURL = process.env.REACT_APP_UNIHUB_SERVER_URL;

const USER_NAME = "userName";
const USER_ADDRESS = "userADDRESS";
const USER_IMAGE_URL = "userImgUrl";
const USER_NFT_ID = "userNFTid";
const USER_SEED = "userSeed";
const USER_CLAIM_HERB = "userClaimHerb";
const USER_PROFILE_REGISTERED = "userProfileRegistered";

const headers = {
  withCredentials: false,
};
console.log("hi nft");

module.exports = {
  test: () => {
    console.log("nftContract Test!!");
  },

  getUserInfo: async () => {
    try {
      const url = `${unihubServerURL}/user/getUserInfo`;
      const address = kaikasApi.getCurrentAccount();

      if (address === 0) {
        alert("지갑을 연결 해주세요.");
        return;
      }

      const send_param = { address: address };
      return await axios.post(url, send_param).then((res) => {
        if (res.data.list) {
          console.log(res.data.list);
          localStorage.setItem(USER_NAME, res.data.list.name);
          localStorage.setItem(USER_ADDRESS, res.data.list.address);
          localStorage.setItem(USER_IMAGE_URL, res.data.list.Profile_IMG_url);
          localStorage.setItem(USER_NFT_ID, res.data.list.Profile_NFT_id);
          localStorage.setItem(USER_SEED, res.data.list.seed);
          localStorage.setItem(USER_CLAIM_HERB, res.data.list.claimHerb);
          localStorage.setItem(
            USER_PROFILE_REGISTERED,
            res.data.list.profile_registered
          );

          return res.data.list;
        } else {
          console.log("등록 필요");
          // 등록 페이지로
        }
      });
    } catch (err) {
      console.log("에러!", err);
      return 0;
    }
  },

  getProfileImg: (setProfileImgUrl) => {
    const savedProfileImgUrl = localStorage.getItem(USER_IMAGE_URL);

    if (savedProfileImgUrl === null) {
      module.exports.getProfileImageFromContract(setProfileImgUrl, 1);
    } else {
      setProfileImgUrl(savedProfileImgUrl);
    }
  },

  getNFTInfo: (setName, setDescription, setAttributes, userProfileNFT_id) => {
    // console.log("mintmint ID Info", userProfileNFT_id);
    module.exports.tokenURI(userProfileNFT_id).then(async (result) => {
      const url = result;

      try {
        axios.get(url, headers).then(async (res) => {
          if (res.status === 200) {
            setName(res.data.name);
            setDescription(res.data.description);
            const attributes = {
              background: res.data.attributes[0]["value"],
              mane: res.data.attributes[1]["value"],
              face: res.data.attributes[2]["value"],
              beard: res.data.attributes[3]["value"],
              glasses: res.data.attributes[4]["value"],
            };
            setAttributes(attributes);

            // setAttributes();
          } else {
            console.log("실패");
          }
        });
      } catch (err) {
        console.log("에러!", err);

        return 0;
      }
    });
  },

  getProfileImageFromContract: (setProfileImgUrl, userProfileNFT_id) => {
    // console.log("mintmint ID IMg", userProfileNFT_id);

    module.exports.tokenURI(userProfileNFT_id).then(async (result) => {
      const url = result;

      try {
        axios.get(url, headers).then(async (res) => {
          if (res.status === 200) {
            setProfileImgUrl(res.data.image);
            localStorage.setItem(USER_IMAGE_URL, res.data.image);
          } else {
            console.log("실패");
          }
        });
      } catch (err) {
        console.log("에러!", err);

        return 0;
      }
    });
  },

  tokenURI: async (NFT_id) => {
    const caver = new Caver(window.klaytn);
    const unihubNFTContract = new caver.klay.Contract(
      contractABI,
      contractAddress
    );

    return await unihubNFTContract.methods
      .tokenURI(NFT_id)
      .call()
      .then(async (result) => {
        return result;
      });
  },

  getBalanceOf: async (account) => {
    const caver = new Caver(window.klaytn);
    const unihubNFTContract = new caver.klay.Contract(
      contractABI,
      contractAddress
    );
    return await unihubNFTContract.methods.balanceOf(account).call();
  },

  tokenOfOwnerByIndex: async (account, index) => {
    const caver = new Caver(window.klaytn);
    const unihubNFTContract = new caver.klay.Contract(
      contractABI,
      contractAddress
    );
    return await unihubNFTContract.methods
      .tokenOfOwnerByIndex(account, index)
      .call();
  },

  getLastNFTid: async (account) => {
    return await module.exports
      .getBalanceOf(account)
      .then(async (tokenBalance) => {
        return await module.exports.tokenOfOwnerByIndex(
          account,
          tokenBalance - 1
        );
      });
  },

  mintNFT: async () => {
    const caver = new Caver(window.klaytn);

    const unihubNFTContract = new caver.klay.Contract(
      contractABI,
      contractAddress
    );
    const abi = unihubNFTContract.methods.mintNFT().encodeABI();
    const mintPrice = 2; // 단위 : klay
    return await kaikasApi.executeContract(contractAddress, mintPrice, abi);
  },
};
