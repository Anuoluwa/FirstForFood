import db from '../config/connection';

const dropRoles = `
DROP TYPE IF EXISTS role cascade`;

const dropUsers = `
DROP TABLE IF EXISTS users cascade`;

const dropOrders = `
DROP TABLE IF EXISTS menus cascade`;

const dropMenus = `
DROP TABLE IF EXISTS orders cascade`;

db.query(dropRoles).then((enumRes) => {
  if (enumRes) {
    console.log('Enum type dropped successfully');
  } else {
    console.log('Error in dropping enum type');
  }
  db.query(dropOrders).then((response) => {
    if (response) {
      console.log('Orders table dropped successfully');
    } else {
      console.log('Error in dropping orders table');
    }
    db.query(dropMenus).then((res) => {
      if (res) {
        console.log('Menus table dropped successfully');
      } else {
        console.log('Error in dropping menus table');
      }
      db.query(dropUsers).then((result) => {
        if (result) {
          console.log('users table dropped successfully');
        } else {
          console.log('Error in dropping users table');
        }
      });
    });
  });
});
