// Records Model

import uuidv4 from 'uuid/v4';
import moment from 'moment';
import pool from '../db/connect';


class Model {
    /**
     * @async create
     * @param {*} createdBy
     * @param {*} type
     * @param {*} location
     * @param {*} images
     * @param {*} videos
     * @param {*} comment
     * @returns {object}
     */
    static async create(createdBy, type, location, images, videos, comment) {
        const sql = 'INSERT INTO records(id, createdOn, createdBy, type, location, status, images, videos, comment) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [
            uuidv4(),
            moment().format(),
            createdBy,
            type,
            location,
            'draft',
            images,
            videos,
            comment,
        ];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async getAll
     * @returns {object}
     */
    static async getAll() {
        const sql = 'SELECT t1.id, createdby, type, location, comment, status, firstname, lastname FROM users INNER JOIN records t1 ON t1.createdby = users.id';

        const { rows } = await pool.query(sql);
        return rows;
    }

    static async getByType(userId, type) {
        const sql = 'SELECT * FROM records WHERE createdBy = $1 AND type = $2';
        const values = [userId, type];

        const { rows } = await pool.query(sql, values);
        return rows;
    }

    /**
     * @async getOne
     * @param {*} userId
     * @param {*} type
     * @returns {object}
     */
    static async getOne(userId, recordId, type) {
        const sql = 'SELECT * FROM records WHERE createdBy = $1 AND id = $2 AND type = $3';
        const values = [userId, recordId, type];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }


    /**
     * @async updateLocation
     * @param {*} recordId
     * @param {*} location
     * @returns {object}
     */
    static async updateLocation(recordId, location, type) {
        const sql = 'UPDATE records SET location = $1 WHERE id = $2 AND type = $3 RETURNING id, location';
        const values = [location, recordId, type];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async updateComment
     * @param {*} recordId
     * @param {*} comment
     * @returns {object}
     */
    static async updateComment(recordId, comment, type) {
        const sql = 'UPDATE records SET comment = $1 WHERE id = $2 AND type = $3 RETURNING id, comment';
        const values = [comment, recordId, type];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async updateStatus
     * @param {*} recordId
     * @param {*} status
     * @param {*} type
     */
    static async updateStatus(recordId, status, type) {
        const sql = 'UPDATE records SET status = $1 WHERE id = $2 AND type = $3 RETURNING id, status';
        const values = [status, recordId, type];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async delete
     * @param {*} userId
     * @param {*} recordId
     * @returns {object}
     */
    static async delete(userId, recordId, type) {
        const sql = 'DELETE FROM records WHERE createdBy = $1 AND id = $2 AND type = $3 RETURNING id';
        const values = [userId, recordId, type];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }
}

export default Model;
