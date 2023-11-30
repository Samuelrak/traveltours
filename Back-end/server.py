import mysql.connector
from flask import Flask, jsonify
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
    return "";

if __name__ == '__main__':
    app.run(debug=True)