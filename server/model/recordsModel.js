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
            moment().format('DD/MM/YYYY'),
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
     * @param {*} userId
     * @returns {object}
     */
    static async getAll(userId) {
        const sql = 'SELECT * FROM records WHERE createdBy = $1';
        const values = [userId];

        const { rows } = await pool.query(sql, values);
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
    static async updateLocation(recordId, location) {
        const sql = 'UPDATE records SET location = $1 WHERE id = $2 RETURNING id, location';
        const values = [location, recordId];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async updateComment
     * @param {*} recordId
     * @param {*} comment
     * @returns {object}
     */
    static async updateComment(recordId, comment) {
        const sql = 'UPDATE records SET comment = $1 WHERE id = $2 RETURNING id, comment';
        const values = [comment, recordId];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    /**
     * @async delete
     * @param {*} userId
     * @param {*} recordId
     * @returns {object}
     */
    static async delete(userId, recordId) {
        const sql = 'DELETE FROM records WHERE createdBy = $1 AND id = $2 RETURNING id';
        const values = [userId, recordId];

        const { rows } = await pool.query(sql, values);
        return rows[0];
    }
}

export default Model;
