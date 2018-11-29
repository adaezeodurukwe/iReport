/**
 * app.js
 * Entry point of application
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './server/routes/routes';

// Create instance of express
const app = express();

// Set middleware
app.use(bodyParser.json());

// Set port
const port = parseInt(process.env.port, 10) || 3000;

// Set app to listen at port
app.listen(port);

// Set route
app.use('/api/v1/red-flags', router);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

export default app;
