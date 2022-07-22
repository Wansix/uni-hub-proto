import React from "react";
import Nav from "react-bootstrap/Nav";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };
const unihubServerURL = process.env.REACT_APP_UNIHUB_SERVER_URL;

const Board = () => {
  const [boardList, setBoardList] = useState([]);

  // const getUserInfo = async (address) => {
  //   // const address = kaikasApi.getCurrentAccount();

  //   const url = `${unihubServerURL}/user/getUserInfo`;
  //   const send_param = {
  //     headers,
  //     address: address,
  //   };

  //   return await axios.post(url, send_param).then(async (result) => {
  //     return result.data.list;
  //   });
  // };

  const getBoardList = () => {
    const url = `${unihubServerURL}/board/getBoardList`;
    const send_param = {
      headers,
    };

    // getUserInfo();
    axios.post(url, send_param).then(async (result) => {
      // console.log(result.data.list);

      const list = [];

      const boards = result.data.list;
      if (boards.length > 0) {
        list.push(
          <li key={"header"} className="boardRow board__header">
            <div className="board__content">{"번호"}</div>
            <div className="board__content">{"제목"}</div>
            <div className="board__content">{"글쓴이"}</div>

            <div className="board__content">{"날짜"}</div>
            <div className="board__content">{"조회"}</div>
            <div className="board__content">{"추천"}</div>
          </li>
        );
        boards.map(async (item) => {
          // console.log(item);

          const postingDate = item.postingDate;
          const postingDateArr = postingDate.split(".");
          const year = postingDateArr[0];

          const month = postingDateArr[1].padStart(2, "0");
          const day = postingDateArr[2].padStart(2, "0");
          const hours = postingDateArr[3].padStart(2, "0");
          const minutes = postingDateArr[4].padStart(2, "0");

          const viewPostingDate = `${year}.${month}.${day}. ${hours}:${minutes}`;

          const contentUrl = `/community/${item.postingID}`;
          list.push(
            <li key={item.postingID} className="boardRow">
              <div className="board__content">{item.postingID}</div>
              <div className="board__content">
                <a href={contentUrl}>{item.title}</a>
              </div>
              <div className="board__content">
                <img src={item.profileImgUrl}></img>
                <span>{item.nickName}</span>
              </div>

              <div className="board__content">{viewPostingDate}</div>
              <div className="board__content">{item.viewCount}</div>
              <div className="board__content">{item.recommendCount}</div>
            </li>
          );
        });

        setBoardList(list);
      }
    });
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return <div className="board">{boardList}</div>;
};

export const Community = () => {
  return (
    <div>
      <div className="communityBoard-header">
        <span>Community</span>

        <Nav.Link href="/community/write">글쓰기</Nav.Link>
      </div>

      <div>
        <Board></Board>
      </div>
    </div>
  );
};

export default Community;
