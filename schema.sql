DROP DATABASE IF EXISTS "FirstforFoodDB";
DROP DATABASE IF EXISTS "test-FirstforFoodDB";
CREATE DATABASE "FirstforFoodDB";
CREATE DATABASE "test-FirstforFoodDB";

INSERT INTO users (username, email, password) VALUES ('johndoe', 'johndoe@gmail.com', 'johndoe');
INSERT INTO menus (food_name,food_desc, price, user_id) VALUES ('Jollof Rice and Chicken','Jollof rice with peppered chicken', '#2300', 1)
INSERT INTO orders (phone,addr, qty, amount, user_id, menu_id) VALUES ('0909999999','home address', '2', '4600', '1')

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username varchar(50) not null,
  email varchar(100) not null,
  password varchar(50) not null,
  CONSTRAINT unique_data UNIQUE (email),
  created_at TIMESTAMP DEFAULT Now()
);

CREATE TABLE menus (
  menu_id SERIAL PRIMARY KEY,
  food_name text not null,
  food_desc text not null,
  price text not null,
  user_id SERIAL references users(user_id),
  created_at TIMESTAMP DEFAULT Now()
);

CREATE TABLE orders (
  order_id serial PRIMARY KEY,
  phone text not null,
  addr text not null,
  qty text not null,
  amount text not null,
  status text null,
  user_id SERIAL references users(user_id),
  menu_id SERIAL references menus(menu_id),
  created_at TIMESTAMP DEFAULT Now()
);
