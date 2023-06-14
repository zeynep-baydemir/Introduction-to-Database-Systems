/*In this query, new entry adds to the Award table which title is "BU-Best Actor" and name of awarded film is "After Sun".
  Then returns new adding entry. */

INSERT INTO Award(Award_Title,Awarded_Film)
SELECT 'BU-Best Actor', Film_ID
FROM Film
WHERE Title = 'After Sun'
RETURNING *;

/*
Deleting last entry to avoid corrupting data.
DELETE FROM Award
WHERE Award_Title = 'BU-Best Actor';
 */