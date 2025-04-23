from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# === DB Connection ===
conn = psycopg2.connect(
    host="localhost",
    database="your_db_name",
    user="your_username",
    password="your_password"
)
cursor = conn.cursor()

# === INSERT ===
@app.route('/api/insert', methods=['POST'])
def insert():
    data = request.json
    table = data['table']
    values = data['values']  # Example: "1, 'John', 300"
    try:
        cursor.execute(f"INSERT INTO {table} VALUES ({values})")
        conn.commit()
        return jsonify({"message": "Insert successful"})
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400

# === UPDATE ===
@app.route('/api/update', methods=['POST'])
def update():
    data = request.json
    table = data['table']
    set_clause = data['set']   # Example: "name='Alice'"
    where_clause = data['where']  # Example: "id=1"
    try:
        cursor.execute(f"UPDATE {table} SET {set_clause} WHERE {where_clause}")
        conn.commit()
        return jsonify({"message": "Update successful"})
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400

# === DELETE ===
@app.route('/api/delete', methods=['POST'])
def delete():
    data = request.json
    table = data['table']
    where_clause = data['where']
    try:
        cursor.execute(f"DELETE FROM {table} WHERE {where_clause}")
        conn.commit()
        return jsonify({"message": "Delete successful"})
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400

# === SELECT ===
@app.route('/api/select', methods=['GET'])
def select():
    table = request.args.get('table')
    try:
        cursor.execute(f"SELECT * FROM {table}")
        rows = cursor.fetchall()
        colnames = [desc[0] for desc in cursor.description]
        return jsonify({"columns": colnames, "rows": rows})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# === VIEW RESULT ===
@app.route('/api/view-result', methods=['GET'])
def view_result():
    try:
        cursor.execute("SELECT * FROM complex_view")  # Replace with actual view
        rows = cursor.fetchall()
        colnames = [desc[0] for desc in cursor.description]
        return jsonify({"columns": colnames, "rows": rows})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
