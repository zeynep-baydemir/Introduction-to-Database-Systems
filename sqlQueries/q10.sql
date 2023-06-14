/*In this query, director, film and genre tables are joined,
  returns the films which are favorite genre of the director of that film is comedy,
  and release year between 2000 and 2010.*/
SELECT f.Title, f.Release_Year
FROM Director d
INNER JOIN Film f ON d.Director_ID = f.Director
INNER JOIN Genre g ON g.Genre_ID = d.Favorite_Genre
WHERE g.Type='Comedy' AND f.Release_Year BETWEEN 2000 and 2010;