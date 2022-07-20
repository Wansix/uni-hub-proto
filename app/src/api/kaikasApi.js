const CaverExtKAS = require("caver-js-ext-kas");
const Caver = require("caver-js");
require("dotenv").config();

const klaytn = window.klaytn;
const chainIdCypress = process.env.REACT_APP_CHAIN_ID_CYPRESS;
const chainIdBaobab = process.env.REACT_APP_CHAIN_ID_BAOBAB;

const accessKeyId = process.env.REACT_APP_KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_KAS_SECRET_ACCRESS_KEY;
const endpoint = process.env.REACT_APP_ENDPOINT;
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

      console.log(accounts);

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
};