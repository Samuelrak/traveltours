import base64

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

@app.route('/put/<int:tour_id>', methods=['PUT'])
def update_tour(tour_id):
    try:
        print(f"Updating tour with ID: {tour_id}")

        # Extract updated data from the request
        name = request.form['name']
        location = request.form['location']
        continent = request.form['continent']
        start_date_str = request.form['start_date']
        end_date_str = request.form['end_date']
        people = int(request.form['people'])
        price = float(request.form['price'])
        photo = request.files['photo'] if 'photo' in request.files else None

        print(f"Received data: {name}, {location}, {continent}, {start_date_str}, {end_date_str}, {people}, {price}")

        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

        # Check if photo is provided in the update
        if photo:
            photo_content = photo.read()
            cursor.execute('''
                UPDATE tours
                SET name = %s, location = %s, continent = %s,
                    start_date = %s, end_date = %s, people = %s,
                    price = %s, photo = %s
                WHERE id = %s
            ''', (name, location, continent, start_date, end_date, people, price, photo_content, tour_id))
        else:
            cursor.execute('''
                UPDATE tours
                SET name = %s, location = %s, continent = %s,
                    start_date = %s, end_date = %s, people = %s,
                    price = %s
                WHERE id = %s
            ''', (name, location, continent, start_date, end_date, people, price, tour_id))
                    
        db.commit()

        response_data = {
            'status': 'success'
        }

        return jsonify(response_data), 200

    except Exception as e:
        print(f"Error updating tour: {e}")
        error_message = str(e)
        response_data = {
            'status': 'error',
            'message': error_message
        }

        return jsonify(response_data), 500

if __name__ == '__main__':
    app.run(debug=True)
