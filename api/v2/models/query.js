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
export const findUserById = userId => `SELECT * FROM users WHERE id = '${userId}'`;

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


export const checkMenuName = menuId => (`
SELECT *
FROM menus  
WHERE menus.id = ${menuId}`);

/**
 * @function createOrder
 * @description This creates order
 * @returns {Object} Object
*/
export const createOrder = requestBody => (`
INSERT INTO orders 
(qty,userId, menuId)
VALUES
('${requestBody.qty}', ${requestBody.userId}, ${requestBody.menuId})
RETURNING *`);

export const calculateAmount = menuId => (`
SELECT price 
FROM menus 
where menus.id=${menuId}`
);

/**
 * @method getUserOrders
 * @description it returns user order history
 * @returns {Object} Object
*/
export const getUserOrders = userId => (`
SELECT * from orders
WHERE UserId = ${userId} ORDER BY id DESC
`);
/**
 * @method getAllOrders
 * @description it returns all orders
 * @returns {Object} Object
*/
export const AllOrders = () => ('SELECT * from orders');

export const getUserOrder = userId => (`
SELECT * from orders
WHERE userIid = ${userId} ORDER BY id DESC
`);

export const getAllOrders = () => (`
SELECT orders.id,
  menus.foodName, 
  menus.foodDescr, 
  menus.price, 
  orders.qty,
  orders.amount,
  users.phone,
  users.address,
  orders.status,
  orders.createdAt
FROM orders 
INNER JOIN menus ON orders.menuId = menus.id 
LEFT JOIN users on orders.userId = users.id order by id desc`);

/**
 * @method findOrder
 * @description get order by id
 * @returns {Object} Object
*/
export const findOrder = orderId => (` SELECT * FROM orders WHERE id = ${orderId}`);

/**
 * @function getMenuByOrderId
 * @description return menu by order id
 * @returns {Object} Object
*/
export const getMenuByOrderId = menuId => (
  `SELECT * FROM orders m WHERE m.menuId = ${menuId}
  `
);

/**
 * @function updateOrder
 * @description edit order status
 * @returns {Object} Object
*/
export const updateOrder = status => (`
UPDATE orders 
SET status = '${status}'
RETURNING *`);
