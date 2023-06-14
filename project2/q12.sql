/*In this query, all films are group by their release year,
  then finds max budget for each year and
  it returns director name, release year and max budget of the year from joined tables of director and film.*/
SELECT d.Director_Name, f.Release_Year, MAX(Budget) AS Max_Budget
FROM Director d
INNER JOIN Film f ON d.Director_ID = f.Director
GROUP BY f.Release_Year;