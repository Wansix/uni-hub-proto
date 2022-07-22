import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const headers = { withCredentials: true };
const unihubServerURL = process.env.REACT_APP_UNIHUB_SERVER_URL;

console.log("hi community detail");

function Content() {
  const [postData, setPostData] = useState([]);

  const params = useParams();

  const getPostContent = () => {
    const url = `${unihubServerURL}/board/getBoardList/${params.id}`;
    const send_param = {
      headers,
    };

    axios.post(url, send_param).then((result) => {
      console.log(result.data.postData);

      let postData = result.data.postData;

      const postingDate = postData.postingDate;
      const postingDateArr = postingDate.split(".");
      const year = postingDateArr[0];

      const month = postingDateArr[1].padStart(2, "0");
      const day = postingDateArr[2].padStart(2, "0");
      const hours = postingDateArr[3].padStart(2, "0");
      const minutes = postingDateArr[4].padStart(2, "0");

      const viewPostingDate = `${year}.${month}.${day}. ${hours}:${minutes}`;

      postData.postingDate = viewPostingDate;
      setPostData(result.data.postData);
    });
  };

  useEffect(() => {
    getPostContent();
  }, []);

  return (
    <div className="posting-wrapper">
      <div className="posting-wrapper__header">
        <div className="posting-wrapper__header-title">
          <div>{postData.title}</div>
          <div>
            <span>작성일</span>
            <span>{postData.postingDate}</span>
          </div>
        </div>
        <div className="posting-wrapper__header-info">
          <div className="posting-wrapper__header-info__profile">
            <div>
              <img src={postData.profileImgUrl}></img>
            </div>
            <div>
              <span>{postData.nickName}</span>
              <span>{postData.address}</span>
            </div>
          </div>
          <div className="posting-wrapper__header-info__postInfo">
            <div>
              <span>조회수</span>
              <span>{postData.viewCount}</span>
            </div>
            <div>
              <span>추천수</span>
              <span>{postData.recommendCount}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="posting-wrapper__content"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      ></div>
    </div>
  );
}

export const CommunityDetail = () => {
  console.log("dfsd");
  return (
    <div className="board-wrapper">
      <div className="boardName">Community</div>
      <Content></Content>
    </div>
  );
};

export default CommunityDetail;
