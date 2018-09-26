/**
 * @function User table queries
 * @description This for user authentication methods
 * @returns {Object} Object
*/
export const createUserAccount = reqBody => (`
INSERT INTO users
(username, email, password, phone, address, admin)
 VALUES ('${reqBody.username}',
 '${reqBody.email}',
 '${reqBody.hashedPassword}',
 '${reqBody.phone}',
 '${reqBody.address}', '${reqBody.admin}')
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

/**
 * @method getAllMenu
 * @description This returns all menu
 * @returns {Object} Object
*/
export const getAllMenu = () => ('SELECT * from menus');

/**
 * @method findMenu
 * @description This gets a menu by id
 * @returns {Object} Object
*/
export const findMenu = menuId => (` SELECT * FROM menus WHERE id = ${menuId}`);
/**
 * @function DeleteMenu
 * @description This deletes a menu
 * @returns {Object} Object
*/
export const deleteMenu = (menuId, userId) => (`
DELETE FROM menus
WHERE menus.id = ${menuId} AND menus.userId = ${userId}`);

/**
 * @function checkMenuId
 * @description This gets a menu by id
 * @returns {Object} Object
*/
export const checkMenuId = menuId => (
  `SELECT id FROM menus WHERE menus.id = ${menuId}`
);

/**
 * @function postAnswer
 * @description This posts a question
 * @returns {Object} Object
*/
export const postAnswer = (answerBody, userId, questionId) => (`
INSERT INTO answers 
(answer_body, user_id, question_id) 
VALUES 
('${answerBody}', ${userId}, ${questionId}) RETURNING *`);
