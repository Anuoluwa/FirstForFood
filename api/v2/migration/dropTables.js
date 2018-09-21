import db from '../config/connect';

const dropUsers = `
DROP TABLE IF EXISTS users cascade`;

const dropOrders = `
DROP TABLE IF EXISTS menus cascade`;

const dropMenus = `
DROP TABLE IF EXISTS orders cascade`;

db.query(dropOrders).then((response) => {
  if (response) {
    console.log('comments table dropped  successfully');
  } else {
    console.log('Error dropping comments table');
  }
  db.query(dropMenus).then((res) => {
    if (res) {
      console.log('answers table dropped successfully');
    } else {
      console.log('Error dropping answers table');
    }
    db.query(dropUsers).then((result) => {
      if (result) {
        console.log('questions table dropped successfully');
      } else {
        console.log('Error dropping questions table');
      }
    });
  });
});
