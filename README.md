Prerequisites

- XAMMP: Version 8.2.12
- MySQL: Version 10.4.32
- Angular: Version 14.2.13
- Python: Version 3.11

Installation

1. Clone the repository: `git clone https://github.com/Samuelrak/traveltours/`
2. Open Xampp and enable MySQL and Apache
3. Open PhpMyAdmin and login
4. After sucesfull login navigate to import and select the database `C:/<PROJECT_DIRECTORY>/traveltours/Database/traveltours.sql`
6. Open Visual Studio Code
7. Install python and angular in Visual Studio Code. If you don`t have
8. Open command prompt in Visual Studio Code
9. Navigate to the backend directory: `cd traveltours/Back-end` or `/Back-end`
10. Install backend dependencies: `py -m pip install -r requirements.txt` and `py -m pip install pyjwt`
11. Start the backend server: `py server.py`
12. Open another command prompt in Visual Studio Code
13. Install frontend dependencies: `npm install`
14. Start the frontend server: `ng serve` or `npm start`
15. Open web browser and navigate to `http://localhost:4200/`
16. Login data: User (username: user, password: 123) and Admin (username: admin, password: 123)
