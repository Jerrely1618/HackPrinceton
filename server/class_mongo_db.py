import random
import string

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://jawadchy15:jjjUUUnnnLLLSSSpring@cluster0.zepxyrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi("1"))
# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

"""
class MongoHandler:
    def __init__(self, host="localhost", port=27017, db_name="hackprinceton"):
        self.client = pymongo.MongoClient(host, port)
        self.db = self.client[db_name]
        self.collection = self.db["INFO"]

    def generate_random_userid(self, length=8):
        return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))

    # return this to finetune the llm accordingly!
    def return_parameters(self, cashiq, balance, weekly_income, name, big_spends, goal):
        return {
            "balance": balance,
            "weekly_income": weekly_income,
            "name": name,
            "big_spends": big_spends,
            "goal": goal,
        }

    def insert_info(self, userid, balance, weekly_income, name, big_spends, goal, card):
        userid = self.generate_random_userid()
        info = {
            "userid": userid,
            "balance": balance,
            "weekly_income": weekly_income,
            "name": name,
            "big_spends": big_spends,
            "goal": goal,
            "card": card,
        }
        self.collection.insert_one(info)
        print(f"Inserted info for userid {userid} into INFO collection.")
"""

# Example usage:
# mongo_handler = MongoHandler()
# mongo_handler.insert_info(
#     cashiq=1000,
#     balance=5000,
#     weekly_income=1500,
#     name="John Doe",
#     big_spends=["Vacation", "Electronics"],
#     goal="Save for a new car",
#     card="Credit Card",
# )
