/* -------------- CREATE DB -------------- */

DROP DATABASE IF EXISTS projet_integration_2017;

CREATE DATABASE projet_integration_2017;

USE projet_integration_2017;


/* -------------- CREATE TABLES -------------- */

CREATE TABLE user (
  user_id            INT                    NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_mail          VARCHAR(255)           NOT NULL,
  user_firstname     VARCHAR(30)            NOT NULL,
  user_lastname      VARCHAR(60)            NOT NULL,
  user_password      VARBINARY(200)         NOT NULL,
  user_total_loyalty INT                    NOT NULL DEFAULT 0,
  user_role          ENUM ('user', 'admin') NOT NULL DEFAULT 'user'
);

CREATE TABLE bread (
  bread_id           INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  bread_name         VARCHAR(50) NOT NULL,
  bread_price        DOUBLE      NOT NULL,
  bread_order_number INT, # used to order the toppings into the menu (if equals, use alphabetic)
  bread_description  VARCHAR(200)
);

CREATE TABLE topping (
  topping_id           INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  topping_order_number INT, # used to order the toppings into the menu (if equals, use alphabetic)
  topping_name         VARCHAR(50) NOT NULL,
  topping_price        DOUBLE      NOT NULL,
  /* 1 = element principal / 2 = crudités / 3 = sauce */
  topping_type         INT         NOT NULL
);

CREATE TABLE sandwich (
  sandwich_id          INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
  sandwich_name        VARCHAR(50) NOT NULL,
  sandwich_description VARCHAR(200),
  sandwich_bread_id    INT         NOT NULL,
  sandwich_is_custom   BOOLEAN              DEFAULT TRUE,
  sandwich_image_src   VARCHAR(255),
  sandwich_user_id     INT,
  FOREIGN KEY (sandwich_bread_id) REFERENCES bread (bread_id),
  FOREIGN KEY (sandwich_user_id) REFERENCES user (user_id)
);

CREATE TABLE topping_on_sandwich (
  tos_sandwich_id INT NOT NULL,
  tos_topping_id  INT NOT NULL,
  PRIMARY KEY (tos_sandwich_id, tos_topping_id),
  FOREIGN KEY (tos_sandwich_id) REFERENCES sandwich (sandwich_id),
  FOREIGN KEY (tos_topping_id) REFERENCES topping (topping_id)
);

CREATE TABLE menu (
  menu_id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  menu_name      VARCHAR(50),
  menu_is_active BOOLEAN      DEFAULT FALSE
);

CREATE TABLE sandwich_on_menu (
  som_sandwich_id  INT NOT NULL,
  som_menu_id      INT NOT NULL,
  som_order_number INT, # used to order the sandwiches into the menu (if equals, use alphabetic)
  PRIMARY KEY (som_menu_id, som_sandwich_id),
  FOREIGN KEY (som_sandwich_id) REFERENCES sandwich (sandwich_id),
  FOREIGN KEY (som_menu_id) REFERENCES menu (menu_id)
);

CREATE TABLE purchase_order (
  order_id      INT                              NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_date    DATETIME                         NOT NULL,
  order_user_id INT                              NOT NULL,
  order_status  ENUM ('open', 'payed', 'closed') NOT NULL DEFAULT 'open',
  FOREIGN KEY (order_user_id) REFERENCES user (user_id)
);

CREATE TABLE order_row (
  or_sandwich_id INT NOT NULL,
  or_order_id    INT NOT NULL,
  or_unit_price  DOUBLE,
  or_quantity    INT NOT NULL,
  or_size        INT NOT NULL DEFAULT 1, #use of enum 0, 1, 2, 3 for 1/4, 1/2, 3/4, Whole
  PRIMARY KEY (or_sandwich_id, or_order_id),
  FOREIGN KEY (or_sandwich_id) REFERENCES sandwich (sandwich_id),
  FOREIGN KEY (or_order_id) REFERENCES purchase_order (order_id)
);


/* -------------- FILL SOME DATAS -------------- */

INSERT INTO user (user_mail, user_firstname, user_lastname, user_password, user_role) VALUES
  ('d.targ@got.com', 'Daenerys', 'Targaryen', 'drogo', 'user'),
  ('j.snow@got.com', 'John', 'Snow', 'winter', 'admin'),
  ('c.lanni@got.com', 'Cersei', 'Lannister', 'queen', 'user'),
  ('t.lanni@got.com', 'Tyrion', 'Lannister', 'halfman', 'user'),
  ('s.stark@got.com', 'Sansa', 'Stark', 'queen', 'user'),
  ('a.stark@got.com', 'Arya', 'Stark', 'faceless', 'user');

INSERT INTO bread (bread_name, bread_price, bread_description) VALUES
  ('Baguette de pain blanc', 2.50, 'Pain blanc légé et digeste.'),
  ('Baguette de campagne', 2.70, 'Pain légèrement gris.'),
  ('Baguette sans gluten', 3.00, 'Pain sans gluten.'),
  ('Baguette à l\'ancienne', 3.00, 'Pain au levain comme le faisait nos grands parents.'),
  ('Baguette au noix', 3.20, 'Pain légèrement gris agrémentés de noix.'),
  ('Baguette complète', 3.20, 'Pain gris presque noir riche en fibres.');

INSERT INTO topping (topping_name, topping_price, topping_type) VALUES
  ('Jambon', 0.50, 1),
  ('Fromage', 0.50, 1),
  ('Salade', 0.05, 2),
  ('Cornichons', 0.05, 2),
  ('Oignons blancs', 0.05, 2),
  ('Tomates', 0.05, 2),
  ('Oeufs', 0.15, 2),
  ('Thon mayonaise', 0.80, 1),
  ('Thon cocktail', 0.80, 1),
  ('Jambon de Parme', 0.90, 1),
  ('Mozzarella', 0.75, 1),
  ('Parmesan', 0.70, 1),
  ('Carpaccio 100% pur boeuf', 1.10, 1),
  ('Roquette', 0.10, 2),
  ('Crème balsamique', 0.05, 3),
  ('Poivrons rouges grillés', 0.10, 2),
  ('Fillets de poulets rotis', 0.70, 1),
  ('Poulet croquants', 0.70, 1),
  ('Boulettes', 0.70, 1),
  ('Saucisses roties', 0.70, 1),
  ('Lardons', 0.15, 2),
  ('Chedar', 0.05, 1);

INSERT INTO sandwich (sandwich_name, sandwich_description, sandwich_bread_id, sandwich_is_custom, sandwich_image_src)
VALUES
  ('Dagobert', 'Une délicieuse baguette ornée de jambon/fromage et de crudités.', 1, FALSE,
   'http://www.pointchaud.be/images/i_products/Medium_Dagobert.jpg'),
  ('Thon Mayo', 'Une délicieuse baguette ornée de Thon mayo et de crudités.', 1, FALSE,
   'http://www.pointchaud.be/images/i_products/Large_Thon-Mayo.jpg'),
  ('Italien', 'Une délicieuse baguette ornée de jambon italien, de mozzarella et de crudités.', 1, FALSE,
   'http://www.pointchaud.be/images/i_products/Large_Italien.jpg'),
  ('Poulet qui croque', 'Une délicieuse baguette ornée de poulet croquant et de crudités.', 1, FALSE,
   'http://www.pointchaud.be/images/i_products/Large_Sandwich-poulet-pane.jpg'),
  ('Carpaccio', 'Une délicieuse baguette ornée de carpaccio et de crudités.', 1, FALSE,
   'http://www.pointchaud.be/images/i_products/Large_Sandwich-carpaccio.jpg'),
  ('Pain saucisses', 'Une délicieuse baguette ornée de Saucisses roties et de crudités.', 1, FALSE,
   'http://www.pointchaud.be/images/i_products/Large_Pain-saucisse.jpg');

INSERT INTO topping_on_sandwich (tos_sandwich_id, tos_topping_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (2, 8),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (2, 7),
  (3, 10),
  (3, 3),
  (3, 6),
  (3, 11),
  (3, 15),
  (4, 18),
  (4, 3),
  (4, 4),
  (4, 5),
  (4, 6),
  (4, 7),
  (5, 13),
  (5, 14),
  (5, 15),
  (5, 6),
  (6, 20),
  (6, 3),
  (6, 4),
  (6, 5),
  (6, 6),
  (6, 7);

INSERT INTO menu (menu_name, menu_is_active) VALUES
  ('Winter menu', TRUE);

INSERT INTO sandwich_on_menu (som_sandwich_id, som_menu_id, som_order_number) VALUES
  (1, 1, 2),
  (2, 1, 4),
  (3, 1, 1),
  (4, 1, 0),
  (5, 1, 3),
  (6, 1, 5);

INSERT INTO purchase_order (order_date, order_user_id, order_status) VALUES
  ('2017-08-06', 1, 'open'),
  ('2017-08-08', 3, 'open'),
  ('2017-08-15', 1, 'open'),
  ('2017-08-25', 1, 'open'),
  ('2017-08-21', 5, 'open'),
  ('2017-08-31', 6, 'open'),
  ('2017-09-01', 2, 'open'),
  ('2017-09-06', 1, 'open'),
  ('2017-09-07', 4, 'open'),
  ('2017-09-08', 1, 'open'),
  ('2017-09-11', 2, 'open'),
  ('2017-09-15', 1, 'open'),
  ('2017-09-19', 2, 'open'),
  ('2017-09-23', 2, 'open'),
  ('2017-09-24', 4, 'open'),
  ('2017-09-25', 1, 'open');


INSERT INTO order_row (or_sandwich_id, or_order_id, or_quantity, or_size) VALUES
  (1, 1, 1, 0),
  (2, 2, 2, 1),
  (3, 3, 1, 1),
  (2, 3, 1, 2),
  (4, 4, 3, 1),
  (5, 5, 1, 3),
  (6, 6, 1, 3),
  (4, 6, 1, 1),
  (5, 7, 2, 2),
  (4, 8, 1, 1),
  (2, 9, 1, 2),
  (1, 10, 2, 1),
  (1, 11, 1, 1),
  (5, 11, 1, 0),
  (3, 12, 2, 1),
  (2, 13, 1, 1),
  (2, 14, 1, 3),
  (1, 15, 3, 1),
  (4, 16, 1, 2);

SET SQL_SAFE_UPDATES = 0;
UPDATE order_row
SET or_unit_price =
(SELECT TRUNCATE(b.bread_price + SUM(t.topping_price), 2)
 FROM sandwich AS s
   LEFT JOIN bread AS b
     ON s.sandwich_bread_id = b.bread_id
   LEFT JOIN topping_on_sandwich AS tos
     ON tos.tos_sandwich_id = s.sandwich_id
   LEFT JOIN topping AS t
     ON t.topping_id = tos.tos_topping_id
 WHERE s.sandwich_id = or_sandwich_id);
SET SQL_SAFE_UPDATES = 1;

