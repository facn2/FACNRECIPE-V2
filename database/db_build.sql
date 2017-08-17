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

INSERT INTO users (username, password) VALUES ('Heather',
'$2a$06$oZuMmXOBzn9YyrR6GcXwn.gy9MBqQU3enW/5yTPgONDfjE6.WpP2O');

INSERT INTO users (username, password) VALUES ('Amy',
'$2a$06$hZq4I5zKaVN1bHZPldPPIu1BTN1z8mpg1hNlCFEdy3lDJlLGftrBa');

INSERT INTO users (username, password) VALUES ('Stefano',
'$2a$06$bV.mJgELpc3P.yAF1cDHVe/a1QbQ1e5DlItfydns2fElZkuc1ohli');

INSERT INTO users (username, password) VALUES ('King',
'$2a$06$FYnPR6b9VK/.x1EWyAvqN.PgRmX3cyMVVnh7wOmfik9WGrv60JtMi');

INSERT INTO users (username, password) VALUES ('Lubel',
'$2a$06$1haB0JCnOdvbd56v4djyGOW2VOx0eUJ3KUrOz8oMGLWvFqy6TdYCO');

INSERT INTO users (username, password) VALUES ('Katia',
'$2a$06$35BvUG7K0uu2yN5NT2ZU2uUHqXsojt5lupnk98SIkm0YV6p3RKRvK');

INSERT INTO users (username, password) VALUES ('Vered',
'$2a$06$6RMu9KW31Mtr5Yki8LkIR.mp9Kjujt3wT2ndyQgiAnOA207hnb4Xu');

INSERT INTO users (username, password) VALUES ('Harry',
'$2a$06$Cp3ktdHdvajC5c8uAnvHBu0D5s.4vvA9fOFs3Ws0P23cdOSAYUoiS');

INSERT INTO users (username, password) VALUES ('Lawson',
'$2a$06$KpnLy2a4/n8LMhERuSeYXuN4ITcaIZBvjR0xXIbz0wKi3loAJ1v2O');

INSERT INTO users (username, password) VALUES ('Mohammad',
'$2a$06$X3W/ACtpo6wne1M05Sjx/eCG9HgfgEFoTwKMrtuIcCMFFOV7vx7/O');

INSERT INTO users (username, password) VALUES ('Esraa',
'$2a$06$.v979DZBJDFflVAI83E/xOphcud2P7RZHKXLKemHLtVbeKvz1B7Ia');

INSERT INTO users (username, password) VALUES ('Suha',
'$2a$06$79wqc00S7PtdgTbi.3FyNuD75jbfWhd782I8DLvhGuhhFInMiCuTy');

INSERT INTO users (username, password) VALUES ('Mario',
'$2a$06$h5i/Bf0R1/ca4bCGPjnBiergYVwecMN/Rvlm5tSNxYrhWg3F.9VM2');

INSERT INTO users (username, password) VALUES ('Judy',
'$2a$06$DVVm.PWbz8h0GX7HwVwxNeWO3XZ.uX2t0M357xtIskeiOCi0duiJG');

INSERT INTO users (username, password) VALUES ('Jack',
'$2a$06$i/EQbN0vlq7abv3vUI1tl.Q0Ql5UysEK8e4WdBa.IijYytaMwyWUK');

INSERT INTO users (username, password) VALUES ('Reem',
'$2a$06$Hzh3H1kemStgU0NYirwUPOVTTL6aMHhiUWa2kLqoHw4mxPDay9yJG');


INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ('Falafel', '1 pound (about 2 cups) dry chickpeas/garbanzo beans - you must start with dry', 'garbanzo, salt, cumin', 'Arabic', 1);

INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ('Sushi', 'Salmon or tuna, nori paper, cucumber', 'roll fish in nori paper and you are done', 'Asian', 2);

INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ('Pizza', '2 tablespoons sugar, 1 tablespoon kosher salt ,1 tablespoon pure olive oil, 3/4 cup warm water,2 cups bread flour (for bread machines), 1 teaspoon instant yeast, 2 teaspoons olive oil,Olive oil-for the pizza crust', 'little bit of basil and the Italian will delete thier whole Pizza History', 'Italian', 5);

INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_directions, recipe_origin, user_id) VALUES ('Mushy peas', '2 tablespoons unsalted butter, ½ small onion, finely chopped, 2 cups shelled fresh peas (from about 2 pounds pods) or 10 ounces frozen peas, thawed, ¼ cup vegetable stock or water, Kosher salt and freshly ground black pepper, ¼ cup fresh mint leaves.', 'little bit of basil will make it better', 'British', 9);



COMMIT;
