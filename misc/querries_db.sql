USE projet_integration_2017;
/*
SELECT * FROM sandwich;

SELECT * FROM topping;

SELECT s.sandwich_id, s.sandwich_name, t.topping_name
FROM sandwich as s 
	LEFT JOIN topping_on_sandwich as tos
		ON tos.tos_sandwich_id = s.sandwich_id
	LEFT JOIN topping as t
		ON t.topping_id = tos.tos_topping_id;
        */

SELECT *
FROM purchase_order;

SELECT *
FROM order_row;


# Get price for sandwich with id = 1
SELECT truncate(b.bread_price + SUM(t.topping_price), 2)
FROM sandwich AS s
  LEFT JOIN bread AS b
    ON s.sandwich_bread_id = b.bread_id
  LEFT JOIN topping_on_sandwich AS tos
    ON tos.tos_sandwich_id = s.sandwich_id
  LEFT JOIN topping AS t
    ON t.topping_id = tos.tos_topping_id
WHERE s.sandwich_id = 1;



# Get all sandwiches and prices for sandwiches from active menu
SELECT
  s.*,
  som.som_order_number as sandwich_order_number,
  (SELECT truncate(b.bread_price + SUM(t.topping_price), 2)
   FROM sandwich AS s2
     LEFT JOIN bread AS b
       ON s2.sandwich_bread_id = b.bread_id
     LEFT JOIN topping_on_sandwich AS tos
       ON tos.tos_sandwich_id = s2.sandwich_id
     LEFT JOIN topping AS t
       ON t.topping_id = tos.tos_topping_id
   WHERE s2.sandwich_id = s.sandwich_id) AS sandwich_price
FROM menu AS m
  LEFT JOIN sandwich_on_menu AS som
    ON som.som_menu_id = m.menu_id
  LEFT JOIN sandwich AS s
    ON s.sandwich_id = som.som_sandwich_id
WHERE m.menu_is_active;


# Get active menu
SELECT m.*
FROM menu AS m
WHERE m.menu_is_active;

