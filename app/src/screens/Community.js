import React from "react";
import Nav from "react-bootstrap/Nav";

export const Community = () => {
  return (
    <div>
      <div className="communityBoard-header">
        <span>Community</span>
        <Nav.Link href="/community/write">글쓰기</Nav.Link>
      </div>

      <div>board</div>
    </div>
  );
};

export default Community;
