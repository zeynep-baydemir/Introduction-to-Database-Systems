/*In this query, joins film and director tables,
  then returns the entries that genre of film and genre of director's favorite is match.*/
SELECT f.*, d.*
FROM Film f
INNER JOIN Director d ON f.Director = d.Director_ID
WHERE f.Genre = d.Favorite_Genre;