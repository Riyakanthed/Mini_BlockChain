from flask import Flask, jsonify, request
from flask_cors import CORS
from blockchain import Blockchain
from wallet import Wallet

# Initialize app, blockchain, and wallet
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


blockchain = Blockchain()
wallet = Wallet()

@app.route('/')
def home():
    return jsonify({"message": "Mini Blockchain is running!"})

@app.route('/wallet/new', methods=['GET'])
def new_wallet():
    """Generate new wallet keys"""
    response = {
        'public_key': wallet.get_public_key_pem(),
        'private_key': wallet.get_private_key_pem()
    }
    return jsonify(response), 200
@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()
    required = ['sender', 'recipient', 'amount']

    if not all(k in values for k in required):
        return jsonify({'error': 'Missing transaction fields'}), 400

    transaction_data = f"{values['sender']}-{values['recipient']}-{values['amount']}"
    signature = wallet.sign_transaction(transaction_data)

    index = blockchain.new_transaction(values['sender'], values['recipient'], values['amount'], signature)

    # 🔹 Automatically mine the block immediately after adding a transaction
    last_block = blockchain.last_block
    proof = blockchain.proof_of_work(last_block['proof'])
    new_block = blockchain.new_block(proof)

    response = {
        'message': f'✅ New block mined automatically!',
        'block_index': new_block['index'],
        'transactions': new_block['transactions']
    }
    return jsonify(response), 201

@app.route('/mine', methods=['GET'])
def mine_block():
    try:
        print("⛏️ Starting mining process...")

        last_block = blockchain.last_block
        last_proof = last_block['proof']
        proof = blockchain.proof_of_work(last_proof)
        print(f"✅ Proof found: {proof}")

        # Reward the miner
        blockchain.new_transaction(
            sender="0",
            recipient="miner-address",  # You can replace this with wallet.public_key if you like
            amount=1,
            signature="reward"
        )

        block = blockchain.new_block(proof)
        print(f"✅ Block #{block['index']} mined successfully!")

        response = {
            'message': '✅ New Block Mined Successfully!',
            'index': block['index'],
            'transactions': block['transactions'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash'],
        }
        return jsonify(response), 200

    except Exception as e:
        print("❌ ERROR WHILE MINING BLOCK:", e)
        return jsonify({'error': str(e)}), 500



    except Exception as e:
        import traceback
        print("❌ ERROR WHILE MINING BLOCK:")
        print(traceback.format_exc())  # This will print the full traceback
        return jsonify({'error': str(e)}), 500




@app.route('/chain', methods=['GET'])
def full_chain():
    """Return the full blockchain"""
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

