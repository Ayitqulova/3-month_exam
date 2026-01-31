-- Active: 1766377822680@@127.0.0.1@5432@Sale
CREATE TABLE branch(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    adress TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transport(
    id SERIAL PRIMARY KEY,
    branch_id INT REFERENCES branch(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    modeli VARCHAR(50) NOT NULL,
    color VARCHAR(30) NOT NULL,
    img TEXT NOT NULL,
    price INT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE staff(
    id SERIAL PRIMARY KEY,
    branch_id INT REFERENCES branch(id) ON DELETE CASCADE,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    birthday VARCHAR(240),
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(50)

);


-- DROP Table staff CASCADE

CREATE TABLE permissions(
    id SERIAL PRIMARY KEY,
    staff_id INT REFERENCES staff(id) ON DELETE CASCADE,
    permission_model VARCHAR(50),
    action VARCHAR(20)
);


