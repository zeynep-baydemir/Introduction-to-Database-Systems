/*In this query, Film and Genre tables are joined and all of them are made groups by their types,
  count function counts film numbers of each type,
  the output is written by descending order. */
SELECT g.Type, COUNT(*) AS 'Film Count'
FROM Film f
JOIN Genre g ON f.Genre = g.Genre_ID
GROUP BY g.Type
ORDER BY `Film Count` DESC;