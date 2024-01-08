import base64
import uuid
import jwt

import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

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
secret_key = 'your_secret_key'
@app.route('/view',  methods=['GET'])
def display_tours():
  cursor.execute('SELECT name, location, continent,start_date, end_date, people, price, photo FROM tours')
  tours = cursor.fetchall()

  for tour in tours:
    if 'photo' in tour and tour['photo'] is not None:
      tour['photo'] = base64.b64encode(tour['photo']).decode('utf-8')

  app.logger.debug(tours)

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
    app.logger.debug(photo)

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

  try:
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user and user['password'] == password:
      payload = {'username': username}

      token = jwt.encode(payload, secret_key, algorithm='HS256')

      session_id = str(uuid.uuid4())

      response_data = {'success': True, 'session_id': session_id, 'token': token, 'message': 'Login successful'}
      response_data['username'] = username

      return jsonify(response_data)
    else:
      return jsonify({'success': False, 'error': 'Invalid username or password'}), 401
  except Exception as e:
    app.logger.error("An error occurred while querying the database: %s", str(e))
    return jsonify({'success': False, 'error': 'An error occurred while processing your request'}), 500
@app.route('/logout', methods=['POST'])
def logout():
  data = request.get_json()
  username = data.get('username')
  app.logger.debug(data)
  try:
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:

      return jsonify({'success': True, 'message': 'Logout successful'})
    else:
      return jsonify({'success': False, 'error': 'User not found'}), 404

  except Exception as e:
    app.logger.error("An error occurred while querying the database: %s", str(e))
    return jsonify({'success': False, 'error': 'An error occurred while processing your request'}), 500

if __name__ == '__main__':
  app.run(debug=True)
