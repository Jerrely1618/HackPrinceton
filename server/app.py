from flask import Flask
from flask_cors import CORS
import modal

app = Flask(__name__)
CORS(app)


@app.route("/login")
def login():
    pass


@app.route("/signup")
def signup():
    pass


@app.route("/ai")
def response():
    pass


@app.route("/cashiq")
def cashiq():
    pass


@app.route("/graph")
def graph():
    pass


if __name__ == "__main__":
    app.run(debug=True)
