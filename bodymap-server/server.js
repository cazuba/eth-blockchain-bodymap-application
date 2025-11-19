const { compiledContract } = require('./compile');
const cors = require('cors');
const express = require('express');

const corsOptions = {
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
};
const app = express();
app.use(cors(corsOptions));

const port = 8000;

app.get('/health', (_, res) => {
    res.send('ok');
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(compiledContract));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});