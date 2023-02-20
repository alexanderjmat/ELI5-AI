DROP DATABASE eli5_ai;

CREATE DATABASE eli5_ai;

\connect eli5_ai;
\i schema.sql;

DROP DATABASE eli5_ai_test;
CREATE DATABASE eli5_ai_test;

\connect eli5_ai_test;
\i schema.sql;