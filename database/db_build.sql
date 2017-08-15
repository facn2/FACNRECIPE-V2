BEGIN;

DROP TABLE IF EXISTS recipe;


CREATE TABLE IF NOT EXISTS recipe (
    recipe_id           SERIAL     PRIMARY KEY,
    recipe_name         TEXT       NOT NULL,
    recipe_ingredients  TEXT       NOT NULL,
    recipe_directions   TEXT       NOT NULL,
    recipe_origin       TEXT       NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
    user_id          SERIAL     PRIMARY KEY,
    user_username    TEXT       NOT NULL,
    user_password    TEXT       NOT NULL
);



INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin) VALUES ('Falafel', '1 pound (about 2 cups) dry chickpeas/garbanzo beans - you must start with dry', 'garbanzo, salt, cumin', 'Arabic');
INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin) VALUES ('Sushi', 'Salmon or tuna, nori paper, cucumber', 'roll fish in nori paper and you are done', 'Asian');

COMMIT;
