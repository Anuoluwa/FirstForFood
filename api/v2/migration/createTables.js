
import db from '../config/connection';

const createUserTable = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
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
    userMenu SERIAL REFERENCES users(id) ON DELETE CASCADE
)`;

const createOrderTable = `
CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  phone TEXT,
  addr TEXT,
  qty TEXT,
  amount TEXT ,
  status TEXT , 
  UserOrders SERIAL REFERENCES users(id) ON DELETE CASCADE ,
  MenuOrders SERIAL REFERENCES menus(id) ON DELETE CASCADE,
  created_at TIMESTAMP Default Now(),
  updated_at TIMESTAMP Default Now()
)`;

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
