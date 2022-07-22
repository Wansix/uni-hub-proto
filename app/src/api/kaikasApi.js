const CaverExtKAS = require("caver-js-ext-kas");
const Caver = require("caver-js");
const contractABI = require("../abi/mintNFT.json");
require("dotenv").config();

const klaytn = window.klaytn;
const chainIdCypress = process.env.REACT_APP_CHAIN_ID_CYPRESS;
const chainIdBaobab = process.env.REACT_APP_CHAIN_ID_BAOBAB;

const accessKeyId = process.env.REACT_APP_KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_KAS_SECRET_ACCRESS_KEY;
const endpoint = process.env.REACT_APP_ENDPOINT;
const contractAddress = process.env.REACT_APP_UNIHUB_NFT_CONTRACT;
console.log("kaikas hi");

module.exports = {
  test: async () => {
    console.log("test button!!");
  },

  isEnabled: async () => {
    return await klaytn._kaikas.isEnabled();
  },

  isUnlocked: async () => {
    return await klaytn._kaikas.isUnlocked();
  },
  // kaikasApi.isUnlocked().then((isUnlocked) => {
  //   //현재 지갑이 unlock일 때 현재 홈페이지가 지갑에 접근 할 수 있도록 승인 요청
  //   if (isUnlocked === true) {
  //     kaikasApi.isEnabled().then((isEnabled) => {
  //       if (isEnabled === false) {
  //         connetWallet();
  //       }
  //     });
  //   }
  // });

  autoConnectWallet: async (connectWallet) => {
    return await module.exports.isUnlocked().then(async (isUnlocked) => {
      //현재 지갑이 unlock일 때 현재 홈페이지가 지갑에 접근 할 수 있도록 승인 요청
      if (isUnlocked === true) {
        await connectWallet();
      }

      console.log("auto connect!!");
      return;
    });
  },

  getCurrentAccount: () => {
    if (klaytn.selectedAddress === undefined) return 0;

    return klaytn.selectedAddress;
  },

  getBlockNumber: (setBlockNumber) => {
    const caver = new Caver(endpoint);

    caver.klay.getBlockNumber().then((blockNumber) => {
      setBlockNumber(blockNumber);
    });
  },

  getTokenListByOwner: async (address) => {
    if (address === undefined) return 0;
    const caverExtKas = new CaverExtKAS(
      chainIdCypress,
      accessKeyId,
      secretAccessKey
    );

    const queryOptions = {
      kind: caverExtKas.kas.tokenHistory.queryOptions.kind.FT,
    };
    try {
      const result = await caverExtKas.kas.tokenHistory.getTokenListByOwner(
        address,
        queryOptions
      );
      return result.items;
    } catch (e) {
      console.log(e);
    }
  },
  transferFrom: async (tokenAddress, sendAddress, receiveAddress, amount) => {
    const caver = new Caver(klaytn);
    const tokenInstance = await new caver.klay.KIP7(tokenAddress);
    console.log(tokenInstance);

    try {
      tokenInstance.transferFrom(
        sendAddress,
        receiveAddress,
        amount * 10 ** 8,
        {
          from: klaytn.selectedAddress,
        }
      );
    } catch (e) {
      console.log("transferForm");
      console.log(e);
    }
  },
  approveToken: (tokenAddress, spenderAddress) => {
    const caver = new Caver(klaytn);
    const tokenInstance = new caver.klay.KIP7(tokenAddress);
    tokenInstance.approve(
      spenderAddress,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      { from: klaytn.selectedAddress }
    );
  },
  connectKaikasWallet: async () => {
    try {
      const accounts = await klaytn.enable();
      const account = accounts[0];

      // console.log(accounts);

      return account;
    } catch (e) {
      alert("connect kaikas failed!!");
      console.log("connect kaikas failed!!");
      console.log(e);
      return 0;
    }
  },

  getBalanceKlay: async () => {
    if (klaytn.selectedAddress === undefined) return "0";
    const caver = new Caver(klaytn);
    try {
      const balance = await caver.klay.getBalance(klaytn.selectedAddress);
      const klayBalance = caver.utils.fromPeb(balance, "KLAY");
      return klayBalance;
    } catch (e) {
      console.log(e);
      return 0;
    }
  },

  changedAccount: (func) => {
    console.log("event!!");
    window.klaytn.on("accountsChanged", func);
  },

  sendTransaction: (_to, _value) => {
    const caver = new Caver(klaytn);
    caver.klay
      .sendTransaction({
        type: "VALUE_TRANSFER",
        from: klaytn.selectedAddress,
        to: _to,
        value: caver.utils.toPeb(_value, "KLAY"),
        gas: 8000000,
      })
      .once("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .once("receipt", (receipt) => {
        console.log("receipt", receipt);
      })
      .once("error", (error) => {
        console.log("error", error);
      });
  },

  // myContract.methods.myMethod(123).encodeABI();

  executeContract: async (_to, _value, abi) => {
    const caver = new Caver(klaytn);

    return await caver.klay
      .sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: klaytn.selectedAddress,
        to: _to,
        data: abi,
        gas: 8000000,
        value: caver.utils.toPeb(_value, "KLAY"),
      })
      .once("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .once("receipt", (receipt) => {
        console.log("receipt", receipt);
        return receipt;
      })
      .once("error", (error) => {
        console.log("error", error);
      });
  },
};
