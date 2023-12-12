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

        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

        cursor.execute('''
            INSERT INTO tours (name, location, continent, start_date, end_date, people, price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (name, location, continent, start_date, end_date, people, price))

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

if __name__ == '__main__':
    app.run(debug=True)
