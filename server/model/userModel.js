// User Model

import uuidv4 from 'uuid/v4';
import moment from 'moment';
import pool from '../db/connect';


/**
 * @class Model
 */
class Model {
    /**
     * @async create
     * @param {*} firstname
     * @param {*} lastname
     * @param {*} othernames
     * @param {*} email
     * @param {*} password
     * @param {*} phone
     * @param {*} isAdmin
     * @returns {object}
     */
    static async create(
        firstname, lastname, username, othernames, email, password, phone, isAdmin,
    ) {
        const sql = 'INSERT INTO users(id, firstname, lastname, username, othernames, email, password, phone, registered, isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [
            uuidv4(),
            firstname,
            lastname,
            username,
            othernames,
            email,
            password,
            phone,
            moment().format(),
            isAdmin,
        ];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async getOne
     * @param {*} email
     * @returns {object}
     */
    static async getOne(email) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    static async getById(id) {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const values = [id];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }
}

export default Model;
