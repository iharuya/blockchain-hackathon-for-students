export const ContractStatus = ({ status }) => {
  return (
    <div>
      <h2 className="text-2xl mb-2">Emoji数</h2>
      <div className="inline-flex space-x-2">
        <div>
          <span>現在</span>
          <span className="font-bold text-4xl px-2">
            {status.currentSupply}
          </span>
        </div>
        <div>
          <span>最大</span>
          <span className="font-bold text-4xl px-2">{status.maxSupply}</span>
        </div>
      </div>
    </div>
  )
}
