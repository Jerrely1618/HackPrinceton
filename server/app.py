import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
from threading import Thread
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from class_mongo_db import MongoHandler

global info
info = {}


# Function to generate analysis image in a separate thread
def generate_analysis_image():
    analysis_img_data = analysis()
    app.analysis_image_data = analysis_img_data


# Function to generate predict image in a separate thread
def generate_predict_image():
    predict_img_data = predict()
    app.predict_image_data = predict_img_data


def analysis():
    df = pd.read_csv("./server/test_data.csv", parse_dates=["date"])

    sns.set_style("whitegrid")
    plt.figure(figsize=(12, 6))

    for _, row in df.iterrows():
        plt.plot([row["date"], row["date"]], [0, row["payment amount"]], linewidth=2)

    plt.xlabel("Date", fontsize=12)
    plt.ylabel("Amount ($)", fontsize=12)
    plt.title("Expense Transactions Over Time", fontsize=14)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.legend().remove()
    analysis_img_data = BytesIO()
    plt.savefig(analysis_img_data, format="png")
    analysis_img_data.seek(0)
    plt.close()

    return analysis_img_data


def predict():
    df = pd.read_csv("./server/test_data.csv", parse_dates=["date"])
    df["payment amount"] *= 0.85

    sns.set_style("whitegrid")
    plt.figure(figsize=(12, 6))

    for _, row in df.iterrows():
        plt.plot([row["date"], row["date"]], [0, row["payment amount"]], linewidth=2)

    plt.xlabel("Date", fontsize=12)
    plt.ylabel("Amount ($)", fontsize=12)
    plt.title("Expense Transactions Over Time (After 15% Reduction)", fontsize=14)
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.legend().remove()
    predict_img_data = BytesIO()
    plt.savefig(predict_img_data, format="png")
    predict_img_data.seek(0)
    plt.close()
    return predict_img_data


# Create Flask app

app = Flask(__name__)
CORS(app)
mongo_handler = MongoHandler()


@app.route("/info")
def load_info():

    return mongo_handler.return_parameters()


@app.route("/login")
def login():
    pass


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    # Destructure the data
    fullName = data.get("fullName")
    estimatedIncome = data.get("estimatedIncome")
    weeklyExpenditures = data.get("weeklyExpenditures")
    bigSpendings = data.get("bigSpendings")
    goals = data.get("goals")

    mongo_handler.insert_info(
        cashiq=0,
        balance=estimatedIncome,
        weekly_expenditures=weeklyExpenditures,
        name=fullName,
        big_spends=bigSpendings.split(",") if bigSpendings else [],
        goal=goals,
    )

    return "success"


@app.route("/ai")
def response():
    pass


@app.route("/cashiq")
def cashiq():
    pass


app.analysis_image_data = None
app.predict_image_data = None


@app.route("/graph")
def graph():
    # Start threads to generate images
    analysis_thread = Thread(target=generate_analysis_image)
    predict_thread = Thread(target=generate_predict_image)
    analysis_thread.start()
    predict_thread.start()

    analysis_thread.join()
    predict_thread.join()

    return send_file(app.predict_image_data, mimetype="image/png")


if __name__ == "__main__":
    app.run(debug=True)
