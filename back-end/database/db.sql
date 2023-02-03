CREATE DATABASE eli5_ai IF NOT EXISTS;

\connect eli5_ai
\i schema.sql

CREATE DATABASE eli5_ai_test;

\connect eli5_ai_test
\i schema.sql