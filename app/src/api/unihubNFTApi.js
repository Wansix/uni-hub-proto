require("dotenv").config();
const Caver = require("caver-js");
const contractABI = require("../abi/mintNFT.json");
const axios = require("axios");
axios.defaults.withCredentials = false;

const contractAddress = process.env.REACT_APP_UNIHUB_NFT_CONTRACT;

console.log("hi nft");

module.exports = {
  test: () => {
    console.log("nftContract Test!!");
  },

  tokenURI: async (setProfileImgUrl) => {
    // console.log("tokenURI!");
    const caver = new Caver(window.klaytn);
    const unihubNFTContract = new caver.klay.Contract(
      contractABI,
      contractAddress
    );

    unihubNFTContract.methods
      .tokenURI(1)
      .call()
      .then((result) => {
        // console.log(result);
        axios.get(result).then((res) => {
          setProfileImgUrl(res.data.image);
        });
      });
  },
};
