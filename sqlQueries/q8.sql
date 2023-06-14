/*In this query, the film, award and director tables are joined,
  they are made groups according to each film, if the film has 3 distinct award, this query returns the name of the director.
  Distinct keyword is used to avoid duplicate names.*/

SELECT DISTINCT(d.Director_Name)
FROM Film f
INNER JOIN Award a ON f.Film_ID = a.Awarded_Film
INNER JOIN Director d ON d.Director_ID = f.Director
GROUP BY f.Film_ID
HAVING COUNT(DISTINCT a.Award_Title) >= 3;

