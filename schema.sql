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
