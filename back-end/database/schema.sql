CREATE TABLE subscribers (
    id INT PRIMARY KEY, 
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE newsletters (
    date VARCHAR(20) PRIMARY KEY
)