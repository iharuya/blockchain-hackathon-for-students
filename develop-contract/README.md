# コントラクトのローカル開発環境

## セットアップ

- `yarn`
- `cp .env.sample .env`して、`.env`ファイルに秘密情報を書き込む

## `.env`について

- `DEV_MNEMONIC`: 開発用ウォレットのニーモニックフレーズ。必ず必要です
- `RPC_URL_[chain name]`: コントラクトのデプロイなどをする場合は必要です。alchemy などから取得してください。
- `EXPLORER_KEY_[chain name]`: バイトコードをデプロイした後、自動でエクスプローラーでソースコードを verify します

## 例

- Sample.sol
  1. `yarn dev`でローカルのブロックチェーンを起動
  1. `yarn compile`でコントラクトをコンパイルする
  1. `yarn typechain`でコントラクトの Typescript の型を生成する
  1. `yarn run:localhost scripts/sample.ts`でローカルのブロックチェーンを使って`sample.ts`を実行する（->コントラクトがしっかりと動作することを目視で確認）
  1. `yarn test tests/Sample.ts`テストを実行

- Emoji コントラクトを optimism goerli チェーンにデプロイし、verify する
  1. (`.envの設定が必要です`)
  1. `yarn compile`
  1. `yarn run:og scripts/deploy-emoji.ts`

## トラブルシューティング

- `yarn clean`
- エディターやts serverの再起動
