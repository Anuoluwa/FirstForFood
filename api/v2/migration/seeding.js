
import db from '../config/connection';

const insertUserTable = `
INSERT INTO  users (id, username, email, password, phone, address, admin) 
VALUES('2', 'adminn', 'adminn@gmail.com', 'adminn', '09087654321', 'qwerty asdf', 'true'),
('3', 'johndoe', 'johndoe@gmail.com', 'johnsecret', '09087654321', 'qwerty asdf', 'false')`;

const insertMenuTable = `
INSERT INTO  menus (id, foodName, foodDescr, price, userId) 
VALUES('1', 'Jollof Rice & Beef', ' Nigerian Jollof Rice & assorted Beef', '£234', '1')`;

const insertOrderTable = `
INSERT INTO  orders (id, phone, addr, qty, amount, status, userId, menuId)
VALUES ('1','09087654332','Qwerty asdf zxcv','23','£2344','','2','1' )`;

db.query(insertUserTable).then((response) => {
  if (response) {
    console.log('Users table seeded successfully');
  } else {
    console.log('Error while seeding users table');
  }
  db.query(insertMenuTable).then((res) => {
    if (res) {
      console.log('Menus table seeded successfully');
    } else {
      console.log('Error while seeding Menus table');
    }
    db.query(insertOrderTable).then((result) => {
      if (result) {
        console.log('Orders table seeded successfully');
      } else {
        console.log('Error while seeding Orders table');
      }
    }).catch(error => console.log(`${error}`));
  }).catch(error => console.log(`${error}`));
}).catch(error => console.log(`${error}`));
