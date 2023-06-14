/* The Counts subquery joins genre, film, director and award.
   Groups the rows by the Type of genre and the Director_Name to count the number of awards for each director and genre.
   The MaxCounts subquery uses the Counts to groups the rows by genre. Calculates the maximum award count for each genre.
   Joins MaxCounts and Counts tables according to genre match, and the award count match.
*/

SELECT Counts.Type AS Genre, Director_Name, Award_Count
FROM (
  SELECT g.Type, d.Director_Name, COUNT(a.Award_ID) AS Award_Count, f.Genre
  FROM Genre g
  INNER JOIN Film f ON g.Genre_ID = f.Genre
  INNER JOIN Director d ON f.Director = d.Director_ID
  INNER JOIN Award a ON f.Film_ID = a.Awarded_Film
  GROUP BY g.Type, d.Director_ID
) AS Counts
INNER JOIN (
  SELECT Type, MAX(Award_Count) AS Max_Award_Count
  FROM (
    SELECT g.Type, d.Director_Name, COUNT(a.Award_ID) AS Award_Count, f.Genre
    FROM Genre g
    INNER JOIN Film f ON g.Genre_ID = f.Genre
    INNER JOIN Director d ON f.Director = d.Director_ID
    INNER JOIN Award a ON f.Film_ID = a.Awarded_Film
    GROUP BY g.Type, d.Director_ID
  ) AS Counts
  GROUP BY Type
) AS MaxCounts
ON Counts.Type = MaxCounts.Type AND Counts.Award_Count = MaxCounts.Max_Award_Count;








