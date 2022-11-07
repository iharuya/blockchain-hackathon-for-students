// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IERC721s {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    function balanceOf(address owner) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function transfer(address to, uint256 tokenId) external;
}

contract ERC721s is IERC721s {
    mapping(uint256 => address) internal _owners;
    mapping(address => uint256) internal _balances;

    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "address zero is invalid");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "invalid token ID");
        return owner;
    }

    function transfer(address to, uint256 tokenId) external {
        require(msg.sender == _owners[tokenId], "unauthorized");
        require(to != address(0), "transfer to zero address");
        _balances[msg.sender]--;
        _balances[to]++;
        _owners[tokenId] = to;
        emit Transfer(msg.sender, to, tokenId);
    }

    // optional
    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "address zero is invalid");
        require(_owners[tokenId] == address(0), "token already exists");
        _balances[to]++;
        _owners[tokenId] = to;
        emit Transfer(address(0), to, tokenId);
    }

    function _burn(uint256 tokenId) internal {
        address owner = _owners[tokenId];
        require(owner != address(0), "token does not exist");
        _balances[owner]--;
        delete _owners[tokenId];
        emit Transfer(owner, address(0), tokenId);
    }
}

contract MyNFT is ERC721s {
    address public immutable ADMIN;

    constructor() {
        ADMIN = msg.sender;
    }

    function mint(address to, uint256 tokenId) external {
        require(msg.sender == ADMIN, "unauthorized");
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) external {
        require(msg.sender == _owners[tokenId], "unauthorized");
        _burn(tokenId);
    }
}
