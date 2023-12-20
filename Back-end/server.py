import base64
import uuid

import mysql.connector
from anaconda_cloud_auth import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

from psutil import users

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'traveltours',
}

db = mysql.connector.connect(**db_config)

cursor = db.cursor(dictionary=True)

active_sessions = {}

@app.route('/view')
def display_tours():
  cursor.execute('SELECT * FROM tours')
  tours = cursor.fetchall()

  for tour in tours:
    if tour['photo']:
      tour['photo'] = base64.b64encode(tour['photo']).decode('utf-8')

  return jsonify(tours)

@app.route('/add', methods=['POST'])
def add_tour():
    try:
        name = request.form['name']
        location = request.form['location']
        continent = request.form['continent']
        start_date_str = request.form['start_date']
        end_date_str = request.form['end_date']
        people = int(request.form['people'])
        price = float(request.form['price'])
        photo = request.files['photo']

        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

        photo_content = photo.read()

        cursor.execute('''
            INSERT INTO tours (name, location, continent, start_date, end_date, people, price, photo)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''', (name, location, continent, start_date, end_date, people, price, photo_content))

        db.commit()

        response_data = {
            'status': 'success'
        }

        return jsonify(response_data), 200

    except Exception as e:
        error_message = str(e)
        response_data = {
            'status': 'error',
            'message': error_message
        }

        return jsonify(response_data), 500

@app.route('/delete/<int:tour_id>', methods=['DELETE'])
def delete_tour(tour_id):
    try:
        cursor.execute('DELETE FROM tours WHERE id = %s', (tour_id,))
        db.commit()

        response_data = {
            'status': 'success'
        }

        return jsonify(response_data), 200

    except Exception as e:
        error_message = str(e)
        response_data = {
            'status': 'error',
            'message': error_message
        }

        return jsonify(response_data), 500

@app.route('/login', methods=['POST'])
def user_login():
  data = request.get_json()

  username = data.get('username')
  password = data.get('password')

  cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
  user = cursor.fetchone()

  if user and user['password'] == password:
    session_id = str(uuid.uuid4())

    response_data = {'success': True, 'session_id': session_id, 'message': 'Login successful'}
    response_data['username'] = username
    return jsonify(response_data)
  else:
    return jsonify({'success': False, 'error': 'Invalid username or password'}), 401

@app.route('/logout', methods=['POST'])
def user_logout():
  session_id = request.headers.get('Authorization')

  if session_id in active_sessions:
    del active_sessions[session_id]
    return jsonify({'success': True, 'message': 'Logout successful'})
  else:
    return jsonify({'success': False, 'error': 'Invalid session ID'}), 401

if __name__ == '__main__':
    app.run(debug=True)
