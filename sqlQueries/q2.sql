/*In this query, film and director tables are joined with inner join,
  entries which their release date's are smaller than 2020 ordered by release years.
  Order by function makes ascending order as default. */

SELECT f.Title, d.Director_Name, f.Release_Year
FROM Film f
INNER JOIN Director d ON d.Director_ID = f.Director
WHERE f.Release_Year < 2020
ORDER BY Release_Year;