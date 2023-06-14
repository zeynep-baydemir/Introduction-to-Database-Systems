CREATE TABLE audience(username VARCHAR(100),password VARCHAR(100) NOT NULL,name VARCHAR(100) NOT NULL,surname VARCHAR(100) NOT NULL,PRIMARY KEY(username));

CREATE TABLE director(username VARCHAR(100),password VARCHAR(100) NOT NULL,name VARCHAR(100) NOT NULL,surname VARCHAR(100) NOT NULL,nation VARCHAR(100) NOT NULL,PRIMARY KEY(username));

CREATE TABLE rating_platform(platform_id INT, platform_name VARCHAR(100) NOT NULL, PRIMARY KEY(platform_id),UNIQUE(platform_name));

CREATE TABLE genre(genre_id INT, genre_name VARCHAR(100) NOT NULL, PRIMARY KEY(genre_id),UNIQUE(genre_name));

CREATE TABLE movie(movie_id INT, movie_name VARCHAR(100) NOT NULL, duration INT NOT NULL, average_rating FLOAT, PRIMARY KEY(movie_id));

CREATE TABLE rating(audience_username VARCHAR(100),movie_id INT,rating FLOAT NOT NULL,PRIMARY KEY(audience_username, movie_id),FOREIGN KEY(audience_username) REFERENCES audience(username)  ON DELETE CASCADE,FOREIGN KEY(movie_id) REFERENCES movie(movie_id)  ON DELETE CASCADE, CHECK ( rating >= 0.0 AND rating <= 5.0));

CREATE TABLE subscribes(audience_username VARCHAR(100), platform_id INT, PRIMARY KEY(audience_username, platform_id), FOREIGN KEY(audience_username) REFERENCES audience(username) ON DELETE CASCADE, FOREIGN KEY(platform_id) REFERENCES rating_platform(platform_id) ON DELETE CASCADE);

CREATE TABLE agrees(director_username VARCHAR(100), platform_id INT, PRIMARY KEY(director_username), FOREIGN KEY(platform_id) REFERENCES rating_platform(platform_id) ON DELETE CASCADE);

CREATE TABLE directs( director_username VARCHAR(100) NOT NULL, movie_id INT, PRIMARY KEY(movie_id), FOREIGN KEY(director_username) REFERENCES director(username) ON DELETE CASCADE, FOREIGN KEY(movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE);

CREATE TABLE theatre(theatre_id INT,theatre_name VARCHAR(100) NOT NULL, theatre_capacity INT NOT NULL, district VARCHAR(100) NOT NULL, PRIMARY KEY(theatre_id));

CREATE TABLE movie_session(session_id INT, movie_id INT,theatre_id INT,timeslot INT NOT NULL, date DATE, PRIMARY KEY(session_id),FOREIGN KEY(movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,FOREIGN KEY(theatre_id) REFERENCES theatre(theatre_id) ON DELETE CASCADE, CHECK ( timeslot >= 1 AND timeslot <= 4));

CREATE TABLE has(genre_id INT, movie_id INT, PRIMARY KEY(movie_id, genre_id), FOREIGN KEY(movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE, FOREIGN KEY(genre_id) REFERENCES genre(genre_id) ON DELETE CASCADE);

CREATE TABLE preceeds(successor_movie_id INT,predecessor_movie_id INT, PRIMARY KEY(successor_movie_id, predecessor_movie_id), FOREIGN KEY(successor_movie_id) REFERENCES movie(movie_id)  ON DELETE CASCADE, FOREIGN KEY(predecessor_movie_id) REFERENCES movie(movie_id)  ON DELETE CASCADE);

CREATE TABLE buy_ticket(session_id INT, audience_username VARCHAR(100), PRIMARY KEY(session_id, audience_username), FOREIGN KEY(session_id) REFERENCES movie_session(session_id) ON DELETE CASCADE, FOREIGN KEY(audience_username) REFERENCES audience(username)  ON DELETE CASCADE);

CREATE TABLE database_managers(username VARCHAR(100),password VARCHAR(100) NOT NULL,PRIMARY KEY(username));



CREATE FUNCTION update_average_rating()
RETURNS TRIGGER AS $$
DECLARE
    total_ratings INT;
    sum_ratings FLOAT;
BEGIN
    SELECT COUNT(*), SUM(rating) INTO total_ratings, sum_ratings
    FROM rating
    WHERE movie_id = NEW.movie_id;

    UPDATE movie
    SET average_rating = sum_ratings / total_ratings
    WHERE movie_id = NEW.movie_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_average_rating_trigger
AFTER INSERT ON rating
FOR EACH ROW
EXECUTE FUNCTION update_average_rating();



