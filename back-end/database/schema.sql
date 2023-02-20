-- subscribers table
CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    confirmation_code VARCHAR(64) NOT NULL UNIQUE,
    subscription_status BOOLEAN NOT NULL DEFAULT false
);

-- newsletter table
CREATE TABLE newsletter (
    id SERIAL PRIMARY KEY,
    date_published VARCHAR(11),
    was_sent BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE overviews (
    id SERIAL PRIMARY KEY,
    overview TEXT NOT NULL,
    newsletter_id INTEGER NOT NULL REFERENCES newsletter
);

-- news_article table
CREATE TABLE news_articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) UNIQUE NOT NULL,
    date_published VARCHAR(11) NOT NULL,
    newsletter_id INTEGER NOT NULL REFERENCES newsletter ON DELETE CASCADE,
    was_sent BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create newsletter_entries table
CREATE TABLE newsletter_entries (
    id SERIAL PRIMARY KEY,
    news_articles_id INTEGER NOT NULL REFERENCES news_articles ON DELETE CASCADE,
    newsletter_id INTEGER NOT NULL REFERENCES newsletter ON DELETE CASCADE,
    title TEXT NOT NULL, 
    article TEXT NOT NULL,
    url VARCHAR(255) NOT NULL,
    date_sent VARCHAR(11),
    was_sent BOOLEAN NOT NULL DEFAULT false
);
