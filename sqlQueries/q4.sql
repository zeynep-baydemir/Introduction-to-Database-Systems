/*In this query, maximum budget of all films from union of film, director and genre tables is selected.
  Director name and type of film are written.*/
SELECT d.Director_Name, g.Type
FROM Film f
JOIN Director d ON f.Director = d.Director_ID
JOIN Genre g ON f.Genre = g.Genre_ID
WHERE f.Budget = (SELECT MAX(Budget)
                  FROM Film);