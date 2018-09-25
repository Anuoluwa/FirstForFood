/**
 * @function User table queries
 * @description This for user authentication methods
 * @returns {Object} Object
*/
export const createUserAccount = reqBody => (`
INSERT INTO users
(username, email, password, phone, address)
 VALUES ('${reqBody.username}',
 '${reqBody.email}',
 '${reqBody.hashedPassword}',
 '${reqBody.phone}',
 '${reqBody.address}')
 RETURNING *
`);

export const findUser = username => `SELECT * FROM users WHERE username = '${username}'`;

export const checkUser = (username, email) => `
SELECT * FROM users 
WHERE username = '${username}' or email = '${email}'
`;

export const findById = userId => `SELECT * FROM users WHERE id = ${userId}`;

/**
 * @function createMenu
 * @description This creates menu
 * @returns {Object} Object
*/
export const createMenu = reqBody => (`
INSERT INTO menus
(foodName, foodDescr, price, userId)
VALUES
('${reqBody.foodName}', '${reqBody.foodDescr}', '${reqBody.price}', ${reqBody.userId})
RETURNING *
`);

export const checkFoodName = (foodName, userId) => (`
SELECT foodName
FROM menus  
WHERE menus.userId = ${userId}
AND 
foodName = '${foodName}' `);
