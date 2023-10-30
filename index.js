const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // Replace with the file path of your MongoDB functions file

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route to connect to MongoDB
app.get('/connect', async (req, res) => {
    try {
        await db.connect();
        res.status(200).send('Connected to MongoDB');
    } catch (error) {
        res.status(500).send('Error connecting to MongoDB');
    }
});

// Route to reset table
app.post('/resetTable', async (req, res) => {
    const numberOfEntries = req.body.numberOfEntries; // Number of entries to reset
    console.log(req.body);
    try {
        await db.resetTable(numberOfEntries);
        res.status(200).send('Table reset successfully');
    } catch (error) {
        res.status(500).send('Error resetting table');
    }
});

// Route to insert data
app.post('/insertData', async (req, res) => {
    const { data, id } = req.body; // Data to insert and ID
    // console.log(data, id, req.body);
    try {
        await db.insertData(data, id);
        res.status(200).send('Data inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting data');
    }
});

// Route to get all data
app.get('/getAllData', async (req, res) => {
    try {
        const data = await db.getAllData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send('Error getting data');
    }
});

// Route to close connection
app.get('/closeConnection', async (req, res) => {
    try {
        await db.closeConnection();
        res.status(200).send('MongoDB connection closed');
    } catch (error) {
        res.status(500).send('Error closing MongoDB connection');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
