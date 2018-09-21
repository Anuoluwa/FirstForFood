
import db from '../config/connect';

const dropUsers = `
DROP TABLE IF EXISTS users cascade`;

const dropOrders = `
DROP TABLE IF EXISTS menus cascade`;

const dropMenus = `
DROP TABLE IF EXISTS orders cascade`;


const createUserTable = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP Default Now(),
    updated_at TIMESTAMP Default Now()
    
)`;

const createMenuTable = `
CREATE TABLE IF NOT EXISTS menus(
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(255) NOT NULL,
    food_descr TEXT NOT NULL,
    price TEXT NULL,
    created_at TIMESTAMP Default Now(),
    updated_at TIMESTAMP Default Now(),
    CONSTRAINT userMenu FOREIGN KEY (user_id) REFERENCES users(id)
)`;

const createOrderTable = `
CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  addr TEXT NOT NULL,
  qty TEXT NOT NULL,
  amount TEXT ,
  status TEXT , 
  CONSTRAINT UserOrders FOREIGN KEY (user_id) REFERENCES users(id)
  CONSTRAINT MenuOrders FOREIGN KEY (menu_id) REFERENCES menus(id),
  created_at TIMESTAMP Default Now(),
  updated_at TIMESTAMP Default Now(),
)`;

db.query(dropOrders).then((response) => {
  if (response) {
    console.log('orders table dropped  successfully');
  } else {
    console.log('Error dropping orders table');
  }
  db.query(dropMenus).then((res) => {
    if (res) {
      console.log('menus table dropped successfully');
    } else {
      console.log('Error dropping menus table');
    }
    db.query(dropUsers).then((result) => {
      if (result) {
        console.log('users table dropped successfully');
      } else {
        console.log('Error dropping users table');
      }
    }).catch(error => console.log(`${error}`));
  }).catch(error => console.log(`${error}`));
}).catch(error => console.log(`${error}`));

db.query(createUserTable).then((response) => {
  if (response) {
    console.log('Users table created successfully');
  } else {
    console.log('Error while creating users table');
  }
  db.query(createMenuTable).then((res) => {
    if (res) {
      console.log('Menus table created successfully');
    } else {
      console.log('Error while creating Menus table');
    }
    db.query(createOrderTable).then((result) => {
      if (result) {
        console.log('Orders table created successfully');
      } else {
        console.log('Error while creating Orders table');
      }
    }).catch(error => console.log(`${error}`));
  }).catch(error => console.log(`${error}`));
}).catch(error => console.log(`${error}`));
