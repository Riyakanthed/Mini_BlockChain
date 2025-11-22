import React, { useState } from "react";
import axios from "axios";

function MineBlock() {
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mineBlock = async () => {
    try {
      setLoading(true);
      setError(null);
      setBlock(null);

      // ✅ Use relative path (proxy in package.json handles backend)
      const res = await axios.get("/mine");

      console.log("Mined block response:", res.data); // debug log
      setBlock(res.data);
    } catch (err) {
      console.error("Mining error:", err);
      setError("Failed to mine block. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>⛏️ Mine Block</h2>
      <button onClick={mineBlock} disabled={loading}>
        {loading ? "Mining..." : "Start Mining"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {block && (
        <div style={{ marginTop: "15px", textAlign: "left" }}>
          <h3>✅ New Block Mined!</h3>
          <p><b>Message:</b> {block.message}</p>
          <p><b>Index:</b> {block.index}</p>
          <p><b>Proof:</b> {block.proof}</p>
          <p><b>Previous Hash:</b> {block.previous_hash}</p>

          <h4>Transactions:</h4>
          {block.transactions.length > 0 ? (
            <ul>
              {block.transactions.map((tx, idx) => (
                <li key={idx}>
                  From <b>{tx.sender}</b> → To <b>{tx.recipient}</b> : {tx.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions in this block.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MineBlock;
