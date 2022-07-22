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

  getCurrentAccount: () => {
    const savedAddress = localStorage.getItem(USER_ADDRESS);

    if (savedAddress === null) {
      return kaikasApi.getCurrentAccount();
    } else {
      return savedAddress;
    }
  },

  getUserInfo: async (setUserInfo) => {
    try {
      const savedAddress = localStorage.getItem(USER_ADDRESS);
      console.log(savedAddress);

      if (savedAddress === null) {
        console.log("not saved!!");
        return await module.exports.getUserInfoFromAccount(setUserInfo);
      } else {
        console.log("get saved!!");
        const userInfo = {
          address: localStorage.getItem(USER_ADDRESS),
          name: localStorage.getItem(USER_NAME),
          profileNFTid: localStorage.getItem(USER_NFT_ID),
          profileImgUrl: localStorage.getItem(USER_IMAGE_URL),
          seed: localStorage.getItem(USER_SEED),
          claimHerb: localStorage.getItem(USER_CLAIM_HERB),
          profile_registered: localStorage.getItem(USER_PROFILE_REGISTERED),
        };
        setUserInfo(userInfo);
        return userInfo;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  // 지갑 연결시 유저 정보
  getUserInfoFromAccount: async (setUserInfo) => {
    try {
      const url = `${unihubServerURL}/user/getUserInfo`;
      const address = kaikasApi.getCurrentAccount();

      if (address === 0) {
        alert("지갑을 연결 해주세요. getUserInfoFromAccount");
        return;
      }

      const send_param = { address: address };
      return await axios.post(url, send_param).then(async (res) => {
        if (res.data.list) {
          // console.log(res.data.list);
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

          setUserInfo({
            address: res.data.list.address,
            name: res.data.list.name,
            profileNFTid: res.data.list.Profile_NFT_id,
            profileImgUrl: res.data.list.Profile_IMG_url,
            seed: res.data.list.seed,
            claimHerb: res.data.list.claimHerb,
            profile_registered: res.data.list.profile_registered,
          });

          return res.data.list;
        } else {
          console.log("등록 필요");

          setUserInfo({
            address: "",
            name: "",
            profileNFTid: 0,
            profileImgUrl:
              "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F1927025491-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F26RjBfFzFVOGIuZIvCnv%252Ficon%252Fd8iMGULLDXKhLrDi9c8X%252FKakaoTalk_20220714_212558110.png%3Falt%3Dmedia%26token%3D1b215d19-0cdd-4ae8-b626-cd48c5f648b1",
            seed: 0,
            claimHerb: 0,
            profile_registered: false,
          });
          return false;
          // 등록 페이지로
        }
      });
    } catch (err) {
      console.log("에러!", err);
      return 0;
    }
  },

  updateUserInfo: async (userInfo) => {
    try {
      const address = kaikasApi.getCurrentAccount();

      if (address === 0) {
        alert("지갑을 연결 해주세요. updateUserInfo");
        return;
      }

      const url = `${unihubServerURL}/user/updateUserInfo`;
      const send_param = {
        address: address,
        name: userInfo.name,
        profileNFTid: userInfo.profileNFTid,
        profileImgUrl: userInfo.profileImgUrl,
        seed: userInfo.seed,
        claimHerb: userInfo.claimHerb,
        profile_registered: userInfo.profile_registered,
      };

      axios.post(url, send_param).then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          alert("등록실패!");
        }

        localStorage.setItem(USER_NAME, userInfo.name);
        localStorage.setItem(USER_ADDRESS, userInfo.address);

        localStorage.setItem(USER_IMAGE_URL, userInfo.profileImgUrl);
        localStorage.setItem(USER_NFT_ID, userInfo.profileNFTid);
        localStorage.setItem(USER_SEED, userInfo.seed);
        localStorage.setItem(USER_CLAIM_HERB, userInfo.claimHerb);
        localStorage.setItem(
          USER_PROFILE_REGISTERED,
          userInfo.profile_registered
        );
      });

      // module.exports
      //   .getProfileImageFromContract(function () {}, profileNFTid)
      //   .then((imgUrl) => {
      //     const url = `${unihubServerURL}/user/registerUserInfo`;
      //     const send_param = {
      //       address: address,
      //       name: name,
      //       profileNFTid: profileNFTid,
      //       profileImgUrl: imgUrl,
      //     };

      //     // axios.post(url, send_param).then((res) => {
      //     //   if (res.data.message) {
      //     //     alert(res.data.message);
      //     //   } else {
      //     //     alert("등록실패!");
      //     //   }

      //     //   localStorage.setItem(USER_NAME, res.data.list.name);
      //     //   localStorage.setItem(USER_ADDRESS, res.data.list.address);
      //     //   localStorage.setItem(USER_IMAGE_URL, res.data.list.Profile_IMG_url);
      //     //   localStorage.setItem(USER_NFT_ID, res.data.list.Profile_NFT_id);
      //     //   localStorage.setItem(USER_SEED, res.data.list.seed);
      //     //   localStorage.setItem(USER_CLAIM_HERB, res.data.list.claimHerb);
      //     //   localStorage.setItem(
      //     //     USER_PROFILE_REGISTERED,
      //     //     res.data.list.profile_registered
      //     //   );
      //     // });
      //   });
    } catch (err) {
      console.log("에러!", err);
      return 0;
    }
  },

  registerUserInfo: async (name, profileNFTid) => {
    try {
      const address = kaikasApi.getCurrentAccount();

      if (address === 0) {
        alert("지갑을 연결 해주세요. registerUserInfo");
        return;
      }

      module.exports
        .getProfileImageFromContract(function () {}, profileNFTid)
        .then((imgUrl) => {
          const url = `${unihubServerURL}/user/registerUserInfo`;
          const send_param = {
            address: address,
            name: name,
            profileNFTid: profileNFTid,
            profileImgUrl: imgUrl,
          };

          axios.post(url, send_param).then((res) => {
            if (res.data.message) {
              alert(res.data.message);
            } else {
              alert("등록실패!");
            }

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
          });
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

  getProfileImageFromContract: async (setProfileImgUrl, userProfileNFT_id) => {
    // console.log("mintmint ID IMg", userProfileNFT_id);

    return await module.exports
      .tokenURI(userProfileNFT_id)
      .then(async (result) => {
        const url = result;

        try {
          return await axios.get(url, headers).then(async (res) => {
            if (res.status === 200) {
              setProfileImgUrl(res.data.image);
              localStorage.setItem(USER_IMAGE_URL, res.data.image);
              return res.data.image;
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

  getTokenInfoJson: async (tokenId) => {
    return await module.exports.tokenURI(tokenId).then(async (result) => {
      const url = result;

      try {
        return await axios.get(url, headers).then(async (res) => {
          if (res.status === 200) {
            return res.data;
          } else {
            return false;
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
