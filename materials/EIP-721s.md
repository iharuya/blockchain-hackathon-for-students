# EIP-721s: Simplified Non-Fungible Token Standard for beginners

## 概要

NFTをしっかりと理解するために、ERC721の簡略化バージョンをもとに実装してみよう。

[実装と利用はこちら](../develop-contract/contracts/ERC721s.sol)

## 仕様

```solidity
pragma solidity 0.8.17;
/// @title ERC-721s Solidity練習用の簡易NFT仕様
/// @dev オリジナルのERC-721はこちら https://eips.ethereum.org/EIPS/eip-721
///  この仕様は以下の機能を省略しています。
///  approval: 代理権限
///  safeTransfer:NFT送り先のコントラクトが受取に対応することを確認
///  ERC-165: コントラクトがあるインターフェースを実装しているか確認
interface IERC721s {
    /// @dev NFTの保有者が変わったときに発火します。
    ///  このイベントはNFTが作成されたとき（`from` == 0）や削除されたとき
    ///  （`to` == 0）も発火します。
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /// @notice あるownerが持っているNFTの数を返す。
    /// @dev ゼロアドレスに結びつくNFTは無効としてエラーを返す。
    /// @param owner 調べるアドレス
    /// @return そのアドレスが持つNFTの量で、ゼロかも知れません
    function balanceOf(address owner) external view returns (uint256);

    /// @notice あるNFTの保有者を調べる
    /// @dev ゼロアドレスに結びつくNFTは無効としてエラーを返す。
    /// @param tokenId 対象のNFT
    /// @return そのNFTの保有者アドレス
    function ownerOf(uint256 tokenId) external view returns (address);

    /// @notice NFTの保有を移転する
    /// @dev `tokenId`の現在の保有者が`msg.sender`でない場合はエラーを返す。
    ///  `to`がゼロアドレスならエラーを返す。`tokenId`が無効な場合はエラーを返す。
    /// @param to 新しい保有者
    /// @param tokenId 送るNFT
    function transfer(address to, uint256 tokenId) external;
}
```
