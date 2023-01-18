-- Create subscribers table

CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscription_status BOOLEAN NOT NULL DEFAULT true
);

-- Create news_article table
CREATE TABLE news_article (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    url VARCHAR(255) NOT NULL,
    date_published TIMESTAMP NOT NULL
);

-- Create summaries table
CREATE TABLE summaries (
    id SERIAL PRIMARY KEY,
    news_article_id INTEGER REFERENCES news_article(id),
    summary TEXT NOT NULL
);

CREATE TABLE newsletter_edition {
    id SERIAL PRIMARY KEY,
    date_published TIMESTAMP,
    was_sent BOOLEAN NOT NULL DEFAULT dals
}

-- Create newsletter_entries table
CREATE TABLE newsletter_entries (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES news_article(id),
    date_sent TIMESTAMP,
    was_sent BOOLEAN NOT NULL DEFAULT false
);

