export const createUserAccount = reqBody => (`
INSERT INTO users
(username, email, password)
 VALUES ('${reqBody.username}',
 '${reqBody.email}',
 '${reqBody.hashedPassword}')
 RETURNING *
`);

export const findUser = username => `SELECT * FROM users WHERE username = '${username}'`;

export const checkUser = (username, email) => `
SELECT * FROM users 
WHERE username = '${username}' or email = '${email}'
`;

export const findById = userId => `SELECT * FROM users WHERE id = ${userId}`;
