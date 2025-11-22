import React, { useEffect, useState } from "react";
import axios from "axios";

function BlockchainView() {
  const [chain, setChain] = useState([]);

  const loadChain = async () => {
    const res = await axios.get("/chain");
    setChain(res.data.chain);
  };

  useEffect(() => {
    loadChain();
  }, []);

  return (
    <div>
      <h2>🧱 Blockchain View</h2>
      <button onClick={loadChain}>Refresh Chain</button>
      {chain.map((block) => (
        <div key={block.index} style={{ textAlign: "left", margin: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
          <p><b>Index:</b> {block.index}</p>
          <p><b>Timestamp:</b> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          <p><b>Proof:</b> {block.proof}</p>
          <p><b>Previous Hash:</b> {block.previous_hash}</p>
          <p><b>Transactions:</b></p>
          <ul>
            {block.transactions.map((tx, i) => (
              <li key={i}>{tx.sender} → {tx.recipient} : {tx.amount}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BlockchainView;
