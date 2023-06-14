/*In this query, the query takes "The Godfather" as a first input,
  and compare budgets with other films which are same release year with "The Godfather". If budget is higher than "The Godfather",
  returns title, release year and budget of the film.*/
SELECT f1.Title, f1.Release_Year, f1.Budget
FROM Film f1
INNER JOIN Film f2 ON f1.Release_Year = f2.Release_Year
WHERE f2.Title = 'The Godfather' AND f1.Budget > f2.Budget;