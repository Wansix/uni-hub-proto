require("dotenv").config();
const axios = require("axios");
// axios.defaults.withCredentials = true;
// const headers = { withCredentials: true };

module.exports = {
  test: () => {
    console.log("mongoDB Test!!");
  },

  connectDB: async () => {
    // const send_param = {
    //   headers,
    //   _id: "444",
    // };
    // axios
    //   .post("https://uni-hub-server.du.r.appspot.com/find/124", send_param)
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
};
