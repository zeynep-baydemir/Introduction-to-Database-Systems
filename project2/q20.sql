/*In this query, case when clause works like basic if statement, if the condition holds returns then part.
  The films are group according to their director, if the director's awarded film number is bigger than 0 it returns
  "TRUE", otherwise "FALSE". The column name is Awarded.*/
SELECT d.Director_ID,
        CASE WHEN(COUNT(DISTINCT a.Awarded_Film) > 0)
        THEN 'TRUE'
        ELSE 'FALSE'
        END AS 'Awarded'
FROM Director d
LEFT JOIN Film f ON d.Director_ID = f.Director
LEFT JOIN Award a ON f.Film_ID = a.Awarded_Film
GROUP BY d.Director_ID;