-- Create subscribers table
CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscription_status BOOLEAN NOT NULL DEFAULT true
);

-- Create news_data table
CREATE TABLE news_data (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    url VARCHAR(255) NOT NULL,
    date_published TIMESTAMP NOT NULL
);

-- Create summaries table
CREATE TABLE summaries (
    id SERIAL PRIMARY KEY,
    news_data_id INTEGER REFERENCES news_data(id),
    summary TEXT NOT NULL
);

-- Create newsletter_entries table
CREATE TABLE newsletter_entries (
    id SERIAL PRIMARY KEY,
    summary_id INTEGER REFERENCES summaries(id),
    date_sent TIMESTAMP NOT NULL
);

