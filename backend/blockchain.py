import hashlib
import json
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.pending_transactions = []
        # Create the genesis block
        self.new_block(previous_hash='1', proof=100)

    def new_block(self, proof, previous_hash=None):
        """Create a new block and add it to the chain"""
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.pending_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }

        # Reset the list of pending transactions
        self.pending_transactions = []
        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount, signature):
        """Add a new transaction to the list of pending ones"""
        self.pending_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
            'signature': signature
        })
        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        """Hash a block"""
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    @property
    def last_block(self):
        """Return the last block in the chain"""
        return self.chain[-1]

    def proof_of_work(self, last_proof):
        """Simple Proof of Work algorithm"""
        proof = 0
        print("⛏️ Mining started...")
        while not self.valid_proof(last_proof, proof):
            proof += 1
        print(f"✅ Proof of work found: {proof}")
        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """Check if hash(last_proof, proof) contains 3 leading zeros"""
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:3] == "000"  # ✅ Reduced difficulty for faster mining
