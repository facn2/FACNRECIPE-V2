BEGIN;

DROP TABLE IF EXISTS recipe, users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL     PRIMARY KEY,
    username    TEXT       NOT NULL,
    password    TEXT       NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe (
    recipe_id           SERIAL     PRIMARY KEY,
    recipe_name         TEXT       NOT NULL,
    recipe_ingredients  TEXT       NOT NULL,
    recipe_directions   TEXT       NOT NULL,
    recipe_origin       TEXT       NOT NULL,
    user_id             integer    REFERENCES users(id) ON UPDATE CASCADE
);

INSERT INTO users (username, password) VALUES ('Leo', '$2a$06$.w4LmZVF0thzlVMQKpKE/.Qfiz9lcPQwiXowfMO7jbW/1dh/kgFVa');

INSERT INTO users (username, password) VALUES ('Sajeda', '$2a$06$kvIsdHPYwNPbxgXhikL03uaC6fHODa5A/6aKUFrplOzuP8/zrMV96');

INSERT INTO users (username, password) VALUES ('Paul', '$2a$06$bI4qOZB6Z9d1iYMF9XD0qeysXOMIqstj4tQufBtdpPN2jSUPZY7lC');

INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ('Falafel', '1 pound (about 2 cups) dry chickpeas/garbanzo beans - you must start with dry', 'garbanzo, salt, cumin', 'Arabic', 1);
INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ('Sushi', 'Salmon or tuna, nori paper, cucumber', 'roll fish in nori paper and you are done', 'Asian', 1);

COMMIT;
