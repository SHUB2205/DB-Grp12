from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
import os
import json

app = Flask(__name__)
CORS(app)

# === Load Environment Variables ===
load_dotenv()
dbhost = os.getenv("DB_HOST")
dbname = os.getenv("DB_NAME")
dbuser = os.getenv("DB_USER")
dbpassword = os.getenv("DB_PASSWORD")

# === DB Connection ===
try:
    conn = psycopg2.connect(
        host=dbhost,
        database=dbname,
        user=dbuser,
        password=dbpassword
    )
    print("Database connection successful")
except Exception as e:
    print(f"Database connection failed: {e}")

# === Create Cursor ===
cursor = conn.cursor()

# === INSERT ===
@app.route('/api/insert', methods=['POST'])
def insert():
    data = request.json
    table = data['table']
    fields = data['fields']  # Array of field names
    values = data['values']  # Array of values
    try:
        # Build the insert query dynamically
        field_names = ', '.join(fields)
        value_placeholders = ', '.join(['%s'] * len(values))
        query = f"INSERT INTO {table} ({field_names}) VALUES ({value_placeholders})"
        cursor.execute(query, values)
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
    fields = data['fields']  # Array of field names
    values = data['values']  # Array of values
    where_clause = json.loads(data['where']) # Example: {"id": 1}
    
    set_str = ', '.join([f"{key} = %s" for key in fields])
    where_str = ' AND '.join([f"{key} = %s" for key in where_clause.keys()])
    
    values = values + list(where_clause.values())
    
    try:
        query = f"UPDATE {table} SET {set_str} WHERE {where_str}"
        cursor.execute(query, values)
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
    where_clause = json.loads(data['where'])
    
    where_str = ' AND '.join([f"{key} = %s" for key in where_clause.keys()])
    values = list(where_clause.values())
    
    try:
        query = f"DELETE FROM {table} WHERE {where_str}"
        cursor.execute(query, values)
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
        conn.rollback()
        return jsonify({"error": str(e)}), 400

# === VIEW RESULT ===
@app.route('/api/view-result', methods=['GET'])
def view_result():
    try:
        cursor.execute("SELECT * FROM view_totalapprovedloanamountbycustomer") 
        rows = cursor.fetchall()
        colnames = [desc[0] for desc in cursor.description]
        return jsonify({"columns": colnames, "rows": rows})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
