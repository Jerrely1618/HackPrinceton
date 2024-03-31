import random
import string
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://chaitanya:81N9PFmx1vQDHclT@cluster0.l0q6ipo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


class MongoHandler:

    def __init__(self, db_name="proshop"):

        self.client = MongoClient(uri, server_api=ServerApi("1"))
        self.db = self.client[db_name]
        self.collection = self.db["users"]

    def generate_random_userid(self, length=8):
        return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))

    def return_parameters(self):
        # Query MongoDB to get the most recent record
        most_recent_record = self.collection.find_one(
            {}, sort=[("_id", pymongo.DESCENDING)]
        )

        if most_recent_record:
            # Remove the 'objectI' field if it exists
            most_recent_record.pop("_id", None)

        return most_recent_record

    def insert_info(self, cashiq, balance, weekly_expenditures, name, big_spends, goal):
        userid = self.generate_random_userid()
        info = {
            "userid": userid,
            "balance": balance,
            "name": name,
            "big_spends": big_spends,
            "goal": goal,
            "cashiq": cashiq,
            "weekly_expends": weekly_expenditures,
        }
        self.collection.insert_one(info)
        return info
