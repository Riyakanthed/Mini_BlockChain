import React from "react";
import "./App.css";
import BlockchainView from "./components/BlockchainView";
import TransactionForm from "./components/TransactionForm";
import MineBlock from "./components/MineBlock";
import Wallet from "./components/Wallet";

function App() {
  return (
    <div className="App">
      <h1>🪙 Mini Blockchain System</h1>
      <p>A simple blockchain demo using Flask + React</p>
      <div className="grid-container">
        <div className="card"><Wallet /></div>
        <div className="card"><TransactionForm /></div>
        <div className="card"><MineBlock /></div>
        <div className="card wide"><BlockchainView /></div>
      </div>
    </div>
  );
}

export default App;
