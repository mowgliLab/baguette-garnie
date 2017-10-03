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
        
select * from purchase_order;

select * from order_row;

select truncate(b.bread_price + SUM(t.topping_price), 2)
from sandwich as s
	left join bread as b
		on s.sandwich_bread_id = b.bread_id
	LEFT JOIN topping_on_sandwich as tos
		ON tos.tos_sandwich_id = s.sandwich_id
	LEFT JOIN topping as t
		ON t.topping_id = tos.tos_topping_id
where s.sandwich_id = 1;

