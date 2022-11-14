# Emoji NFT

## Emoji NFT プロジェクトを完成させよう

攻略順(`./src`を基準にする)

1. `App.jsx`, `.env.local`
1. `Layout.jsx`
1. `constants/emojiContract.js`
1. `components/Main.jsx`のロジック
1. `components/MintEmoji.jsx`
1. mint したら、OpenSea で自分の NFT コレクションを登録
1. `constants/config.jsx`
1. `components/EmojiCard.jsx`

## 参考

### ethers.js

[https://docs.ethers.io/v5/](https://docs.ethers.io/v5/)

JS で EVM 系のチェーンと対話するためのライブラリ

おさえておきたいポイント

- [Provider, Signer, Contract オブジェクトについて](https://docs.ethers.io/v5/getting-started/#getting-started--glossary)
- [Contract オブジェクトの扱い方について](https://docs.ethers.io/v5/getting-started/#getting-started--contracts)
- [BigNumber オブジェクトについて](https://docs.ethers.io/v5/api/utils/bignumber/)
- [JS が扱える整数の最大値について](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
- [数字の unit(wei)と変換について](https://docs.ethers.io/v5/api/utils/display-logic/)

### Wagmi

[https://wagmi.sh/](https://wagmi.sh/)

EVM 系のチェーンを扱いやすくする react の hooks を提供するライブラリ

ウォレット接続、残高取得、コントラクトの実行 etc.

裏で ethers.js を利用している

### RainbowKit

[https://www.rainbowkit.com/docs/introduction](https://www.rainbowkit.com/docs/introduction)

ウォレットの接続に関するアレコレをやってくれるライブラリ

裏で ethersjs と wagmi を利用している
