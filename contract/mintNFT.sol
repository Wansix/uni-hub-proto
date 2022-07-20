// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNFT is ERC721Enumerable, Ownable {
    string public notRevealedURI;
    string public metadataURI;    
    bool public isRevealed;

    mapping (address=> bool) public whitelist;    

    constructor(string memory _name, string memory _symbol, string memory _notRevealedURI) ERC721(_name, _symbol) {
        notRevealedURI = _notRevealedURI;
    }

    function mintNFT() public payable {
        require(totalSupply() < 100, "You can no longer mint NFT.");
        require(whitelist[msg.sender], "Caller is not whitelist");
        require(msg.value >= 2 * 10 ** 18, "Not enough klay.");

        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        payable(owner()).transfer(msg.value);
    }

    function batchMintNFT(uint _amount) public {
        for(uint i = 0; i < _amount; i++) {
            mintNFT();
        }
    }

    function tokenURI(uint _tokenId) override public view returns (string memory) {
        if(isRevealed == false) {
            return notRevealedURI;
        }

        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }

    function setTokenURI(string memory _metadataURI) public onlyOwner {
        metadataURI = _metadataURI;
    }

    function reveal() public onlyOwner {
        isRevealed = true;
    }

    function setWhitelist(address _whitelistAddress) public onlyOwner {
        whitelist[_whitelistAddress] = true;
    }
}