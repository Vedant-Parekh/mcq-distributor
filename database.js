// const env = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// MONGO_KEY = process.env.MONGO_KEY;
MONGO_KEY = "vedant"
const uri = "mongodb+srv://mongo_user:" + MONGO_KEY + "@cluster0.hbz0r.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function resetTable(number_of_entries) {
    default_data = {
        "_id": 0,
        "images": [],
        "worked_on": "None",
        "answer": ""
    }
    try {
        const collection = client.db('MCQ-distributor').collection('data');
        await collection.deleteMany({});
        for (let i = 1; i <= number_of_entries; i++) {
            default_data._id = i;
            await collection.insertOne(default_data);
        }
        console.log("Table reset successfully!");
    } catch (error) {
        console.error("Error resetting table:", error);
    }
}

async function insertData(data, id) {
  try {
    const collection = client.db('MCQ-distributor').collection('data');
    const filter = { _id: id };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        images: data.images,
        worked_on: data.worked_on,
        answer: data.answer
      },
    };
    const result = await collection.updateOne(filter, updateDoc, options);
    console.log("Data updated successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

async function getAllData() {
    try {
        const collection = client.db('MCQ-distributor').collection('data');
        const result = await collection.find({}).toArray();
        return result;
    } catch (error) {
        console.error("Error getting data:", error);
    }
}

async function closeConnection() {
  await client.close();
  console.log("MongoDB connection closed.");
}

module.exports = {
  connect,
  insertData,
  resetTable,
  getAllData,
  closeConnection,
};