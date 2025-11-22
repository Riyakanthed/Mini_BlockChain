import React, { useState } from "react";
import axios from "axios";

function TransactionForm() {
  const [form, setForm] = useState({ sender: "", recipient: "", amount: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/transactions/new", form);
    setResult(res.data);
  };

  return (
    <div>
      <h2>💳 New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input name="sender" placeholder="Sender Address" onChange={handleChange} required />
        <input name="recipient" placeholder="Recipient Address" onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
        <button type="submit">Add Transaction</button>
      </form>
      {result && <p>{result.message}</p>}
    </div>
  );
}

export default TransactionForm;
