const pool = require('./database.js')

const create = async (description) => {
    await pool.query(`
        INSERT INTO todo (description)
        VALUES ($1) 
        RETURNING *
        `, [description])
}

const get = async () => {
    await pool.query(`
        SELECT * 
        FROM todo
        `)
}

const remove = async (id) => {
    await pool.query(`
        DELETE FROM todo
        WHERE todo_id = $1
        `, [id])

}

module.exports = {
    create,
    get,
    remove
}