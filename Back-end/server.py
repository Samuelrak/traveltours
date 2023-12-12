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
# Pridala 's' k nazvu db 'traveltour' lebo taky bol script v MySQL.sql
    'database': 'traveltours',
}

db = mysql.connector.connect(**db_config)

cursor = db.cursor(dictionary=True)

@app.route('/view')
def display_tours():
    cursor.execute('SELECT * FROM tours')
    tours = cursor.fetchall()
    return jsonify(tours)

# GET podla mna pre /add netreba
# TODO skusim si vytiahnut lokaciu nejak efektnejsie, nech sa kontinent sam doplni
@app.route('/add', methods=['GET','POST'])
def add_tour():
    try:
        name = request.form['name']
        location = request.form['location']
        continent = request.form['continent']
        start_date_str = request.form['start_date']
        end_date_str = request.form['end_date']
        people = int(request.form['people'])
        price = float(request.form['price'])

        # Convert date strings to datetime objects
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

if __name__ == '__main__':
    app.run(debug=True)
