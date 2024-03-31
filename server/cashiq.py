import pandas as pd
import numpy as np

# Read the CSV file into a DataFrame


def calcl_cash_iq():

    df = pd.read_csv("../server/test_data.csv", parse_dates=["date"])

    # Filter data for the last 30 days
    last_30_days = df[df["date"] >= df["date"].max() - pd.DateOffset(days=30)]

    # Calculate total spending for each category over the last 30 days
    category_totals = last_30_days.groupby("category")["payment amount"].sum()

    # Define scoring criteria
    criteria = {
        "Food": 10,
        "Rent": 20,
        "Insurance": 20,
        "Utilities": 5,
        "Savings": 20,
        "Entertainment": 10,  # 10% of total spending
        "Travel": 10,  # 10% of total spending
        "Miscellaneous": 5,  # 15% of total spending
    }

    # Initialize the total score
    total_score = 0

    # Calculate the score for each category using the specified formula
    for category, amount in category_totals.items():
        points = criteria.get(category, 0)
        if (
            points > 0 and amount > 0
        ):  # Apply the formula only if both points and amount are positive
            score = (
                amount * np.log(amount) / 200
            )  # Apply the formula x = x * log(x) / 2
            total_score += score
            total_score += np.log(45) / 2

    return str(int(total_score))
