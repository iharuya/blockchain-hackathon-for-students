// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Emoji is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public immutable ALPHA;
    uint256 public immutable BETA;
    uint256 public immutable MAX_TOKENID;
    string public baseURI;

    constructor(
        uint alpha,
        uint beta,
        uint max_tokenId,
        string memory baseURI_
    ) ERC721("Emoji", "EMJ") {
        ALPHA = alpha;
        BETA = beta;
        MAX_TOKENID = max_tokenId;
        setBaseURI(baseURI_);
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

    function withdraw(uint256 amount) external onlyOwner {
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send value");
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
        baseURI = baseURI_;
    }

    // From @openzeppelin/contracts/utils/Strings.sol
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);
        return string.concat(baseURI, "/", toString(tokenId), ".json");
    }
}
