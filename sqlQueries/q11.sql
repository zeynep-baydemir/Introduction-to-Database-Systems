/*In this query, joins the table of film, director and award.
  Then, finds the films which are not directed by Martin Scorsese with WHERE NOT keyword,
  and finds the films which are not have any award with checking film id is in the awarded film list or not.
  Then returns intersection of both conditions. */
SELECT DISTINCT(f.Title)
FROM Film f
INNER JOIN Director d ON d.Director_ID = f.Director
LEFT OUTER JOIN Award a ON f.Film_ID = a.Awarded_Film
WHERE NOT d.Director_Name = ' Martin Scorsese' AND f.Film_ID NOT IN (SELECT f.Film_ID
                                                                     WHERE f.Film_ID=a.Awarded_Film);