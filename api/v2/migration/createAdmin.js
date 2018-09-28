import bcrypt from 'bcryptjs';
import db from '../config/connection';

const queries = `
INSERT INTO users
(username, email, password, phone, address, admin)
 VALUES ($1, $2, $3, $4, $5, $6)
 RETURNING *
`;
const password = bcrypt.hashSync('adminuser', 10);
const values = ['superadmin', 'superadmin@gmail.com', password, '07077777777', 'Some where around the world', 'true'];

db.query(queries, values)
  .then((result => console.log('Admin account inserted successfully')))
  .catch((error) => {
    console.log(error);
  });
