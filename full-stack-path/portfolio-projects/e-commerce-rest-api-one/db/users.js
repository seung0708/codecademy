const {checkUserAccess} = require('./utils/utilities');
//used for passport authentication
const getUserByEmail = async (email) => {
    const result = await pool.query(`
        SELECT *
        FROM users
        WHERE email = $1
        `,[email]
    )
    console.log(result.rows)
    return result.rows[0]
}

//used for passport authentication
const findUserById = async (id) => {
    //console.log(id)
    const result = await pool.query(`
        SELECT * 
        FROM users
        WHERE id = $1
        `, [id]
    )
    return result.rows[0]
}

const getUserById = async (req, res, next) => {
    const isUserLoggedIn = checkUserAccess(req.params.id, req.user.id);

    if(!isUserLoggedIn) {
        return res.status(403).json({message: 'You are not authorized to edit this account'})
    }

    try { 
        const results = await pool.query(`
            SELECT * 
            FROM users 
            WHERE id = $1`, 
            [id]
        )

        if (results.rows.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        return res.status(200).json(results.rows)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server error'})
    }
}

const updateUser = async(req, res, next) => {
    const updates = req.body;

    const isUserLoggedIn = checkUserAccess(req.params.id, req.user.id);

    if(!isUserLoggedIn) {
        return res.status(403).json({message: 'You are not authorized to edit this account'})
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No fields provided to update' });
    }

    const setClauses = [];
    const values = [];

    let i = 1; 
    for (const key in updates) {
        setClauses.push(`${key} = $${i}`);
        values.push(updates[key]);
        i++;
    }

    values.push(id);

    const query = `
    UPDATE users
    SET ${setClauses.join(', ')}
    WHERE id = $${i}
    RETURNING *;
  `;

    try {
        const result = await pool.query(query, values)
         if(result.rows.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error); 
        res.status(500).json({error: 'Database updated failed'});
    }
}

const deleteUser = async (req, res, next) => {
    const isUserLoggedIn = checkUserAccess(req.params.id, req.user.id);

    if(!isUserLoggedIn) {
        return res.status(403).json({message: 'You are not authorized to edit this account'})
    }

    await pool.query(`
        DELETE 
        FROM users
        WHERE id = $1
        `, [id]
    )

    res.status(200)

}

module.exports = {
    getUserByEmail, 
    getUserById,
    updateUser,
    deleteUser
}
