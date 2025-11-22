"Mini Blockchain System — Wallet, Transactions & Mining Web App"
  description: >
    A simple and educational blockchain implementation where users can generate wallets,
    create digitally signed transactions, mine blocks using Proof-of-Work, and view the
    blockchain through a web interface. Backend is built with Flask (Python) and frontend
    with React.

features:
  - RSA-based wallet (public/private key generation)
  - Digitally signed transactions
  - Proof-of-Work mining
  - SHA-256 hashing for block security
  - Blockchain ledger containing previous hash linking
  - Full blockchain visualization on UI

tech_stack:
  frontend: ["React", "Axios"]
  backend: ["Python", "Flask"]
  cryptography: ["RSA Key Pair"]
  hashing: "SHA-256"
  mining: "Proof-of-Work"

running_instructions:
  backend:
    commands:
      - "cd backend"
      - "venv\\Scripts\\activate"
      - "pip install -r requirements.txt"
      - "python app.py"
    url: "http://127.0.0.1:5000/"
  frontend:
    commands:
      - "cd frontend"
      - "npm install"
      - "npm start"
    url: "http://localhost:3000/"
  note: "Backend and frontend must run at the same time."

usage_steps:
  - "Open the frontend URL in browser"
  - "Generate wallet to obtain public and private key"
  - "Create a transaction (sender, receiver, amount)"
  - "Click 'Add Transaction'"
  - "Click 'Mine Block' to add transaction to a new block"
  - "Scroll to view the blockchain history"

goal: >
  Understand blockchain concepts through practical implementation:
  hashing, block linking, PoW mining, signatures, and ledger maintenance.
  This project is intended for education only.

future_enhancements:
  - P2P networking (multiple blockchain nodes)
  - Consensus algorithm
  - Adjustable mining difficulty
  - Mempool and transaction validation UI
  - Better dashboard analytics

