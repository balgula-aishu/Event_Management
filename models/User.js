const db = require('./db');

const User = {
//   create: async (email, password) => {
//     const [result] = await db.query(
//       'INSERT INTO users (email, password) VALUES (?, ?)',
//       [email, password]
//     );
//     return result;
//   },

//   findByEmail: async (email) => {
//     const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
//   },
// };

// module.exports = User;
// !-----------------
create: (userData, callback) => {
  const { email, password } = userData;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], callback);
},
findByEmail: (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
},
};

module.exports = User;
