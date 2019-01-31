// Table queries

import pool from './connect';

// Create user table
const createUserTable = () => {
    const data = `CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        username TEXT NOT NULL,
        othernames TEXT,
        email VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        registered TIMESTAMP NOT NULL,
        isAdmin BOOLEAN NOT NULL
    )`;
    pool.query(data);
};

// Drop user table
const dropUserTable = () => {
    const data = 'DROP TABLE IF EXISTS users CASCADE';
    pool.query(data);
};

// Create record table
const createRecordsTable = () => {
    const data = `CREATE TABLE IF NOT EXISTS records(
        id UUID PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL,
        createdBy UUID REFERENCES users(id),
        type TEXT NOT NULL,
        location VARCHAR(100) NOT NULL,
        status TEXT NOT NULL,
        images VARCHAR[],
        videos VARCHAR[],
        comment VARCHAR(200) NOT NULL
    )`;

    pool.query(data);
};

// Drop record table
const dropRecordsTable = () => {
    const data = 'DROP TABLE IF EXISTS records CASCADE';
    pool.query(data);
};

export {
    createUserTable, dropUserTable, createRecordsTable, dropRecordsTable,
};
