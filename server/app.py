import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
from threading import Thread
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from class_mongo_db import MongoHandler
import requests
import json
from cashiq import calcl_cash_iq
from recommend import ask_gpt
from ai import ask_gpt
from openai import OpenAI
import os


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
client = OpenAI(api_key=os.environ["GPT_API_KEY"])

client.fine_tuning.jobs.create(
    training_file="../server/test_data.csv", model="gpt-4-0613"
)


@app.route("/rec", methods=["POST"])
def rec_ai():
    data = request.get_json()
    balance = data["balance"]
    return ask_gpt(balance, client)


@app.route("/response")
def get_response():

    data = request.get_json()
    question = data["question"]

    prompt = "Provide a helpful response with personalized financial advice based on the user's query in upto (128 words). Include specific recommendations and money-saving tips tailored to the user's spending patterns. If the user's query is about a specific transaction, provide a detailed breakdown of the transaction and suggest ways to save money or optimize spending. If the user's query is about a general financial topic, provide a detailed explanation and actionable advice. If the user's query is about a financial goal, provide a detailed plan to achieve the goal and suggest specific actions to take. If the user's query is about a financial problem, provide a detailed solution and suggest specific steps to resolve the issue. If the user's query is about a financial decision, provide a detailed analysis of the decision and suggest the best course of action. In terms of stocks, and investments, provide a detailed analysis of the user's portfolio and suggest ways to optimize their investments, reduce risk, and increase returns, but you MUST mention that this is not financial advice and they should consult a financial advisor before making any investment decisions. Must not show json data, only text. Question: {question}".format(
        question=question
    )
    return ask_gpt(prompt, client)


@app.route("/info")
def load_info():
    return mongo_handler.return_parameters()


@app.route("/login")
def login():
    pass


@app.route("/verbwire", methods=["POST"])
def upload_CreditCardInfo():
    data = request.get_json()
    with open("cardInformation.txt", "w") as file:
        json.dump(data, file)
    url = "https://api.verbwire.com/v1/nft/store/file"

    files = {
        "filePath": (
            "cardInformation.txt",
            open("cardInformation.txt", "rb"),
            "text/plain",
        )
    }
    headers = {
        "accept": "application/json",
        "X-API-Key": "sk_live_508146f3-74e7-4769-80cb-39dd156fead3",
    }
    response = requests.post(url, files=files, headers=headers)
    return "success"


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
    return calcl_cash_iq()


if __name__ == "__main__":
    app.run(debug=True)
app.py