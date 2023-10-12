import { useEffect, useState } from "react"
import { OPENSEA_ASSET_BASEURL } from "../constants/config"
import { ADDRESS } from "../constants/emojiContract"

export const EmojiCard = ({ contract, tokenId }) => {
  const [metadata, setMetadata] = useState()

  useEffect(() => {
    getMetadata()
  }, [])

  const getMetadata = async () => {
    // @todo: コントラクトからtokenIdのURIを取得しよう
    const url = await contract.tokenURI(tokenId)
    console.log(url)
    const res = await fetch(url)
    const json = await res.json()
    setMetadata(json)
  }

  return (
    <div className="p-4 border rounded-lg">
      {metadata === undefined ? (
        <p>ロード中...</p>
      ) : (
        <div>
          <figure
            dangerouslySetInnerHTML={{ __html: metadata.image_data }}
            className="mb-4"
          ></figure>
          <h2 className="text-lg font-bold mb-2">{metadata.description}</h2>
          <a
            href={`${OPENSEA_ASSET_BASEURL}/${ADDRESS}/${tokenId}`}
            target="_blank"
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:opacity-60"
          >
            取引する
          </a>
        </div>
      )}
    </div>
  )
}
