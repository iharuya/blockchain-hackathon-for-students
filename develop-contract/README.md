# コントラクトのローカル開発環境

## セットアップ

- `yarn`
- `cp .env.sample .env`して、`.env`ファイルに秘密情報を書き込む

## `.env`について

- `DEV_MNEMONIC`: 開発用ウォレットのニーモニックフレーズ。必ず必要です
- `MUMBAI_RPC_URL`: mumbai チェーンに書き込み（コントラクトのデプロイなど）をする場合は必要です。alchemy などから取得してください。
- `POLYGONSCAN_APIKEY`: これがあると、mumbai チェーンにデプロイするときは自動で polygonscan にソースコードを verify します
- `GOERLI_RPCURL`と`ETHERSCAN_APIKEY`: mumbai チェーンのときと同様に、goerli チェーンに対応します

## 例

- Sample コントラクトをローカル環境にデプロイし、そのままコントラクトとスクリプトでやり取りする

  1. `yarn dev`でローカルのブロックチェーンを起動
  1. `yarn compile`でコントラクトをコンパイルする
  1. `yarn typechain`でコントラクトの Typescript の型を生成する
  1. `yarn execute scripts/sample.ts --network localhost`でローカルのブロックチェーンを使って`sample.ts`を実行する

- Emoji コントラクトを mumbai チェーンにデプロイし、verify する
  1. (`.envの設定が必要です`)
  1. `yarn compile`
  1. `yarn execute scripts/deploy-emoji.ts --network mumbai`
