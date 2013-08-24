from flask import Flask,request,redirect,render_template
from sqlite3 import dbapi2 as sqlite3
import json

DEBUG = True
DATABASE = "nowa.db"

app = Flask(__name__)
app.config.from_object(__name__)

@app.route("/",methods=["POST","GET"])
def hello():
	if request.method == "POST":
		return "ajax works"
	else:
		return "hello world"

@app.route("/xml",methods=["GET","POST"])
def ass():
	if request.method == "POST":
		o = json.loads(request.data)
		#x = "aa"
		#y = "bb"
		#with get_db() as db:
		#	db.cursor().execute("INSERT INTO data (message,datetime) VALUES (?,?)", (x,y))
		#db.commit()
		return str(o) 

	elif request.method == "GET":
		with get_db() as db:
			data = db.cursor().execute("SELECT * FROM data")
		returned = [i for i in data.fetchall()]
		return str(returned)
	return "request made ok"

def get_db():
	return sqlite3.connect(app.config["DATABASE"])

def init_db():
	db = get_db()
	with app.open_resource('schema.sql') as a:
		db.cursor().executescript(a.read())
	db.commit()

if __name__ == "__main__":
	app.run()
