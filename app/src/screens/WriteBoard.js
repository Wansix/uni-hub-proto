import React from "react";
import { CKEditor } from "ckeditor4-react";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const kaikasApi = require("../api/kaikasApi.js");
const unihubNFTApi = require("../api/unihubNFTApi.js");
const headers = { withCredentials: true };

const unihubServerURL = process.env.REACT_APP_UNIHUB_SERVER_URL;

export const WriteBoard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const writeBoard = () => {
    console.log("title", title);
    console.log("content", content);

    if (title === undefined || title === "") {
      alert("글 제목을 입력 해주세요.");
      // title.focus();
      return;
    } else if (content === undefined || content === "") {
      alert("글 내용을 입력 해주세요.");
      // content.focus();
      return;
    }

    const address = kaikasApi.getCurrentAccount();
    if (address === 0) {
      alert("지갑을 연결 해주세요.");
      return;
    }

    unihubNFTApi.getUserInfo().then((userInfo) => {
      const url = `${unihubServerURL}/board/write`;

      const send_param = {
        headers,
        // id: this.props.location.query._id,
        title: title,
        content: content,
        address: address,
        nickName: userInfo.name,
        profileImgUrl: userInfo.Profile_IMG_url,
      };

      axios.post(url, send_param).then((result) => {
        console.log(result.data.message);
        if (result.data.message) {
          alert(result.data.message);
          window.location.href = "/community";
        } else {
          alert("글쓰기 실패");
        }
      });
    });
  };

  const getValue = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <h2>글쓰기</h2>

      <input
        type="text"
        placeholder="제목"
        onChange={getValue}
        name="title"
      ></input>
      <CKEditor
        onChange={(event) => {
          const data = event.editor.getData();
          setContent(data);
        }}
      />
      <button
        onClick={
          writeBoard
          //   () => {
          //   console.log("title", title);
          //   console.log("content", content);
          // }
        }
      >
        제출
      </button>
    </div>
  );
};

export default WriteBoard;
