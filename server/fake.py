import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Read the CSV file into a DataFrame
df = pd.read_csv("test_data.csv", parse_dates=["date"])

# Set Seaborn style
sns.set_style("whitegrid")

# Plot each expense as a separate line graph
plt.figure(figsize=(12, 6))

for _, row in df.iterrows():
    plt.plot([row["date"], row["date"]], [0, row["payment amount"]], linewidth=2)

plt.xlabel("Date", fontsize=12)
plt.ylabel("Amount ($)", fontsize=12)
plt.title("Expense Transactions Over Time", fontsize=14)
plt.xticks(rotation=45)
plt.tight_layout()

# Remove legend
plt.legend().remove()

# Show the plot
plt.show()

# Calculate category-wise total amounts for the pie chart
category_totals = df.groupby("category")["payment amount"].sum()

# Plot the pie chart for distribution by category
plt.figure(figsize=(8, 8))
plt.pie(
    category_totals, labels=category_totals.index, autopct="%1.1f%%", startangle=140
)
plt.title("Distribution of Expenses by Category", fontsize=14)
plt.axis("equal")  # Equal aspect ratio ensures that pie is drawn as a circle
plt.tight_layout()

# Show the pie chart
plt.show()
