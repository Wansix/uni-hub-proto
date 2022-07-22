import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <div className="header">
      <div className="header__home">
        <a href="/">
          <img src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F1927025491-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F26RjBfFzFVOGIuZIvCnv%252Ficon%252Fd8iMGULLDXKhLrDi9c8X%252FKakaoTalk_20220714_212558110.png%3Falt%3Dmedia%26token%3D1b215d19-0cdd-4ae8-b626-cd48c5f648b1"></img>
          <h1>Uni-hub</h1>
        </a>
      </div>
      <div className="header__menu">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/community">커뮤니티</Nav.Link>
        <Nav.Link href="/nftInfo">NFT정보</Nav.Link>
        <Nav.Link href="/mintInfo">mintComing</Nav.Link>
        <Nav.Link href="/mint">Mint</Nav.Link>
        <Nav.Link href="/mymenu">myMenu</Nav.Link>
      </div>
    </div>
  );
};

export default Header;
