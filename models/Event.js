const db = require('./db');

const Event = {
  create: async (name, description, date, owner) => {
    try{
    const [result] = await db.query(
      'INSERT INTO events (name, description, date, owner) VALUES (?, ?, ?, ?)',
      [name, description, date, owner]
    );
    // return result;
    return { id: result.insertId, name, description, date, owner };
    } catch (err) {
    console.error('Error creating event:', err);
    throw err;
  }
},

  findAll: async () => {
    try{
    const [rows] = await db.query('SELECT * FROM events');
    return rows;
    }catch (err) {
        console.error('Error fetching events:', err);
        throw err;
      }
    },
  };


module.exports = Event;