from pymongo import MongoClient

# Replace the URI with your own
mongo_uri = "mongodb+srv://dev:DJgMpxz8oXvLN0ma@article-management.pcflq.mongodb.net/?retryWrites=true&w=majority&appName=article-management"

# Connect to MongoDB
client = MongoClient(mongo_uri)
# Access the specific database
db = client["article-management-db"]

# Test connection by listing databases
try:
    collections = db.list_collection_names()
    print("Collections:", collections)
    for collection_name in collections:
        collection = db[collection_name]
        document = collection.find_one()  # Fetch the first document

        if document:
            print(f"\nCollection: {collection_name}")
            print("Fields:", document.keys())
        else:
            print(f"\nCollection: {collection_name} is empty.")

except Exception as e:
    print("Failed to connect:", e)
