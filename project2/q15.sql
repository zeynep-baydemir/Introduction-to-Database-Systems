/*In this query, groups all films according to their directors,
  then sort directors according to film counts,
  returns maximum of film count.*/
SELECT Director_Name, MAX(Film_Count) as Film_Count
FROM (SELECT d.Director_Name as Director_Name, COUNT(*) AS Film_Count
      FROM Film f
      INNER JOIN Director d ON f.Director = d.Director_ID
      GROUP BY d.Director_ID);