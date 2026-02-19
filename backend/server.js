const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper: Read DB
const readDB = () => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
};

// Helper: Write DB
const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4));
};

// API Routes
app.get('/api/data', (req, res) => {
    try {
        const db = readDB();
        res.json(db);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read database' });
    }
});

app.post('/api/progress', (req, res) => {
    try {
        const db = readDB();
        const { progress } = req.body;
        db.progress = { ...db.progress, ...progress };
        writeDB(db);
        res.json({ message: 'Progress updated successfully', progress: db.progress });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

app.post('/api/feedback', (req, res) => {
    try {
        const db = readDB();
        const { feedback } = req.body;
        db.feedback.push({
            ...feedback,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        writeDB(db);
        res.json({ message: 'Feedback saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
