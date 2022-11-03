// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Emoji is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public constant ALPHA = 0.001 ether;
    uint256 public constant BETA = 0.01 ether;
    uint256 public constant MAX_TOKENID = 10;
    string baseURI;

    constructor() ERC721("Emoji", "EMJ") {
        baseURI = "http://localhost:5173/metadata/json/";
    }

    function getMintPrice() public view returns (uint256) {
        return ALPHA * nextTokenId + BETA;
    }

    function mint() public payable {
        uint256 nextTokenId_ = nextTokenId;
        require(nextTokenId_ <= MAX_TOKENID, "Sold out");
        require(msg.value == getMintPrice(), "Wrong value sent");
        _safeMint(msg.sender, nextTokenId_);
        nextTokenId = nextTokenId_ + 1;
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
        baseURI = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function withdraw(uint256 amount) external onlyOwner {
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send value");
    }
}
