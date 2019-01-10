/**
 * app.js
 * Entry point of application
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import router from './server/routes/routes';
import { createUserTable, createRecordsTable } from './server/db/dbschema';

// Create instance of express
const app = express();

// Create tables
createUserTable();
createRecordsTable();

// Set bodyparser middleware
app.use(bodyParser.json());

// set cors
app.use(cors());

// Set port
const port = parseInt(process.env.PORT, 10) || 3000;

// Set app to listen at port
app.listen(port);

// Set route
app.use('/api/v1/', router);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

export default app;
