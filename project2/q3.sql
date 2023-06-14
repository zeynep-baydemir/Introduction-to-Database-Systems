/*In this query, using MIN function the minimum budget of all films is selected from Film table.
  All fields of films are written. */
SELECT *
FROM Film
WHERE Budget = (SELECT MIN(Budget)
                FROM Film);
