-- Create additional database for celebration service
CREATE DATABASE celebrationdb;

-- NOTE: userdb is automatically created by the POSTGRES_DB environment variable in docker-compose.yaml
-- Connect to userdb to create tables
\c userdb;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    dob DATE NOT NULL
);

-- Insert some dummy data for testing
INSERT INTO users (name, email, dob) VALUES 
('Sourav Mallick', 'mallicksourav487@gmail.com', CURRENT_DATE),
('DevOps Admin', 'admin@example.com', CURRENT_DATE - INTERVAL '1 day');

-- Connect to celebrationdb
\c celebrationdb;

CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL
);

-- Insert some dummy data for gallery
INSERT INTO photos (url) VALUES 
('https://images.unsplash.com/photo-1464349095431-e9a21285b5f3'),
('https://images.unsplash.com/photo-1533275392661-d703798cf85d');
