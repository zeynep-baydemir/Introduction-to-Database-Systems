/* In this query, genre, film and director tables are needed to be joined to get the result.
   Joined tables are grouped by both genre type and director id to be able to count number of films of directors in each genre.
   Having clause filters to get only rows that have maximum number of films
   First subquery is used to calculate the number of films of directors for each genre.
   Second subquery is used to find directors who have won award in that genre and NOT IN is used to exclude these directors.
 */

SELECT g.Type, d.Director_Name, COUNT(f.Film_ID) as Film_Count
FROM Genre g
INNER JOIN Film f ON g.Genre_ID = f.Genre
INNER JOIN Director d ON f.Director = d.Director_ID
GROUP BY g.Type, d.Director_ID
HAVING COUNT(f.Film_ID) = (SELECT MAX(Film_Count)
                          FROM (
                            SELECT COUNT(f.Film_ID) AS Film_Count, g.Type, d.Director_Name
                            FROM Genre g
                            INNER JOIN Film f ON g.Genre_ID = f.Genre
                            INNER JOIN Director d ON f.Director = d.Director_ID
                            GROUP BY g.Type, d.Director_ID
                          ) AS Counts
                          WHERE Counts.Type = g.Type AND d.Director_Name NOT IN (SELECT d2.Director_Name
                                                                                 FROM Genre g2
                                                                                 INNER JOIN Film f2 ON g2.Genre_ID = f2.Genre
                                                                                 INNER JOIN Director d2 ON f2.Director = d2.Director_ID
                                                                                 INNER JOIN Award a2 ON f2.Film_ID = a2.Awarded_Film
                                                                                 WHERE Counts.Type = g2.Type));

