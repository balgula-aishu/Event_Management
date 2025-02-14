const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../models/db');


exports.register = async (req, res,next) => {
  const { email, password } = req.body;
  try {
  //?   const salt = await bcrypt.genSalt(10);
  //   ?const hashedPassword = await bcrypt.hash(password, salt);
  //  ? await User.create(email, hashedPassword);
  //   ?res.status(201).send('User registered successfully');
  // ?} catch (err) {
  //  ? res.status(500).send('Server error');
  //? }
//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   await User.create({ email, password: hashedPassword });

//   res.status(201).json({ message: 'User registered successfully' });
// } catch (err) {
//   console.error('Registration Error:', err);
//   res.status(500).json({ message: 'Server error' });
// }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findByEmail(email);
//     if (!user) return res.status(400).send('Invalid email or password.');
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).send('Invalid email or password.');
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
//     res.send({ token });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// };
// !----------------
const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    
    // Create new user
    User.create({ email, password: hashedPassword }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error registering user' });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query to find user by email
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error('Error during database query:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        // If no user is found
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0]; // Get the first user from results

      // Compare provided password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        console.log('Password matched');
        // Generate JWT token
        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
        return res.status(200).json({ token, message: 'Login successful' });
      } else {
        console.log('Password did not match');
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
