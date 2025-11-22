import React, { useState } from "react";
import axios from "axios";

function Wallet() {
  const [wallet, setWallet] = useState(null);

  const generateWallet = async () => {
    const res = await axios.get("/wallet/new");
    setWallet(res.data);
  };

  return (
    <div>
      <h2>🔑 Wallet</h2>
      <button onClick={generateWallet}>Generate Wallet</button>
      {wallet && (
        <div>
          <h4>Public Key:</h4>
          <textarea rows="6" cols="40" readOnly value={wallet.public_key}></textarea>
          <h4>Private Key:</h4>
          <textarea rows="6" cols="40" readOnly value={wallet.private_key}></textarea>
        </div>
      )}
    </div>
  );
}

export default Wallet;
