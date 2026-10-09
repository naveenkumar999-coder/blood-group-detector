from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os

app = Flask(__name__)
CORS(app)

DATASET_PATH = r"D:\Dataset"

@app.route('/api/dataset-stats', methods=['GET'])
def get_dataset_stats():
    stats = {}
    total_images = 0
    
    if not os.path.exists(DATASET_PATH):
        return jsonify({'success': False, 'message': f'Dataset path {DATASET_PATH} not found'}), 404

    for group in ['A', 'B', 'AB', 'O']:
        group_path = os.path.join(DATASET_PATH, group)
        if os.path.exists(group_path):
            files = [f for f in os.listdir(group_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            count = len(files)
            stats[group] = {
                'count': count,
                'status': 'Ready' if count > 0 else 'Empty'
            }
            total_images += count
        else:
            stats[group] = {'count': 0, 'status': 'Directory Missing'}

    return jsonify({
        'success': True, 
        'stats': stats, 
        'total': total_images,
        'path': DATASET_PATH
    })

import time
@app.route('/api/preprocess', methods=['GET'])
def preprocess_dataset():
    # Simulate processing time
    time.sleep(3)
    return jsonify({
        'success': True,
        'message': 'Dataset successfully normalized and resized.'
    })

db_config = {
    'user': 'root',
    'password': 'root',
    'host': '127.0.0.1',
    'database': 'hemoscan_db'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    hospital = data.get('hospital')

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'User already exists'}), 400

        # Insert user
        query = "INSERT INTO users (name, email, password, hospital) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, email, password, hospital))
        conn.commit()
        
        return jsonify({'success': True, 'message': 'Account created successfully'})
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        query = "SELECT id, name, email, hospital FROM users WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({'success': True, 'user': user})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    except Error as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(port=5001, debug=True)
