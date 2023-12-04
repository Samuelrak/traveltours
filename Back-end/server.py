import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'traveltour',
}

db = mysql.connector.connect(**db_config)

cursor = db.cursor(dictionary=True)

@app.route('/view')
def display_tours():
    cursor.execute('SELECT * FROM tours')
    tours = cursor.fetchall()
    return jsonify(tours)

@app.route('/add', methods=['GET', 'POST'])
def add_tour():
    name = request.form['name']
    location = request.form['location']
    continent = request.form['continent']
    date = request.form['date']
    people = int(request.form['people'])
    price = float(request.form['price'])

    cursor.execute('''
            INSERT INTO tours (name, location, continent, start_date, end_date, people, price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (name, location, continent, date, date, people, price))

    db.commit()

    response_data = {
        'status': 'success'
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
