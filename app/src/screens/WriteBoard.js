import React from "react";
import { CKEditor } from "ckeditor4-react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

export const WriteBoard = () => {
  //   const [writingContent, setWritingContent] = useState({
  //     title: "",
  //     content: "",
  //   });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const writeBoard = () => {
    console.log("writeBoard!!");
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
        onClick={() => {
          console.log("title", title);
          console.log("content", content);
        }}
      >
        제출
      </button>

      {/* <Form.Control
        type="text"
        // style={titleStyle}
        placeholder="글 제목"
        // ref={(ref) => (this.boardTitle = ref)}
      />
      <CKEditor
        data={this.state.data}
        onChange={this.onEditorChange}
      ></CKEditor>
      <Button onClick={this.writeBoard} block>
        저장하기
      </Button> */}
    </div>
  );
};

export default WriteBoard;
