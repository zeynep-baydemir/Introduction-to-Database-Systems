/*In this query, groups all films according to their director,
  for each director calculates average budget with AVG keyword,
  then returns director name and average budget according to descending order of average budget.*/
SELECT d.Director_Name, AVG(f.Budget) as Avg_Budget
FROM Film f
INNER JOIN Director d on f.Director = d.Director_ID
GROUP BY d.Director_ID
ORDER BY Avg_Budget DESC;
