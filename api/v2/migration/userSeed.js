import db from '../config/connection';

const user = {
  text: 'INSERT INTO users(id, username, email, password, phone, address, admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
  values: [2, 'example', 'example@gmail.com', 'example', '12345678900', 'some where in Africa', false],
};

db.query(user, (err, res) => {
  if (err) {
    return err;
  }
  const menu = {
    text: 'INSERT INTO menus(id, foodName, foodDescr, price, userId) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [1, 'exampledfood', 'example food', '123', 1],
  };
  db.query(menu, (err, res) => {
    if (err) {
      return err;
    }
    const orders = {
      text: 'INSERT INTO orders(id, qty, amount, status, userId, menuId) VALUES($1, $2, $3, $4, $5)',
      values: [1, '100', '1200', 'New', 2, 1],
    };
    db.query(orders, (err, res) => {
      if (err) {
        return err;
      }
      db.end();
    });
  });
});
