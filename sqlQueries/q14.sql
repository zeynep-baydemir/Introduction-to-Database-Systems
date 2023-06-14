/*In this query, checks release year of film is bigger than 2015,
  also checks awarded films and takes not awarded films,
  then returns title, director name and release year of the films which satisfy both conditions,
  also returns ascending order by release year.*/
SELECT f.Title, d.Director_Name, f.Release_Year
FROM Film f
INNER JOIN Director d on f.Director = d.Director_ID
LEFT OUTER JOIN Award a ON a.Awarded_Film = f.Film_ID
WHERE f.Release_Year>2015 AND f.Film_ID NOT IN (SELECT f.Film_ID
                                                WHERE f.Film_ID=a.Awarded_Film)
ORDER BY Release_Year;