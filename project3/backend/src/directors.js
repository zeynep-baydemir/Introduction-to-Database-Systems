import {runQuery} from "./runQuery.js";

class Directors{
    async login(req,res){
        const {username, password} = req.body;
        try{
            const query = `SELECT * FROM director WHERE username = '${username}' AND password = '${password}';`;
            const loggedIn = await runQuery(query);
            console.log(loggedIn.length);
            if (loggedIn.length === 0){
                res.status(201).send('Wrong password or username')
            }else{
                res.status(200).send(username);
            }
        }catch(err){
            res.send(err);
        }
    }
    async addMovie(req, res){
        const {movieId, movieName, theatreId, timeslot, date, genre_list, duration,session_id, username} = req.body;
        try{
            const query = `INSERT INTO movie (movie_id, movie_name, duration) VALUES (${movieId}, '${movieName}', ${duration});`;
            await runQuery(query);
            const querydir = `INSERT INTO directs VALUES ('${username}', ${movieId});`;
            await runQuery(querydir);
            const query1 = `INSERT INTO movie_session (session_id ,movie_id, theatre_id, timeslot, date) VALUES (${session_id} , ${movieId}, ${theatreId}, ${timeslot}, '${date}');`;
            await runQuery(query1);
            var genre_array = JSON.parse(genre_list.replace(/'/g, '"'));
            for (const gen of genre_array) {
                const query2 = `INSERT INTO has (movie_id, genre_id) VALUES (${movieId}, '${gen}');`;
                await runQuery(query2);
            }
            res.status(201).send("successfully inserted movie")
        }catch(err){
            res.send(err);
        }  
    }

    async addPred(req, res){
        const {movieId1,movie_list} = req.body;
        try{
            var pred_movie_list = JSON.parse(movie_list.replace(/'/g, '"'));
            for (const movieId2 of pred_movie_list) {
                const query = `INSERT INTO preceeds (successor_movie_id, predecessor_movie_id) VALUES (${movieId1}, ${movieId2});`;
                await runQuery(query);
            }
            res.status(201).send("successfully inserted predecessor movie")
        }catch(err){
            res.send(err);
        }  
    }
    async availableTheatres(req, res){
        const slot = req.body.slot;
        const username = req.body.username;
        try{
            const query = `SELECT t.theatre_id, t.district, t.theatre_capacity FROM theatre t WHERE t.theatre_id NOT IN (SELECT theatre_id  FROM movie_session  WHERE timeslot = ${slot});`;
            const rows = await runQuery(query);
            res.send(rows);
        }catch(err){
            res.send(err);
        }  
    }
    async ticketAudience(req,res){
        const movie_id = req.body.movieId;
        const username = req.body.username;
        try{
            const query = `SELECT a.username, a.name, a.surname FROM audience a JOIN buy_ticket bt ON a.username = bt.audience_username JOIN movie_session ms ON bt.session_id = ms.session_id JOIN movie m ON ms.movie_id = m.movie_id JOIN directs d ON m.movie_id = d.movie_id WHERE d.director_username = '${username}' AND ms.session_id = ${movie_id};`;
            const rows = await runQuery(query);
            res.send(rows);
        }catch(err){
            res.send(err);
        }  
    }
    async updateMovie(req,res){
        const movie_id = req.body.movieId;
        const movie_name = req.body.movieName;
        const username = req.body.username;
        try{
            const query = `UPDATE movie SET movie_name = '${movie_name}' WHERE movie_id = ${movie_id}  AND movie_id IN (SELECT movie_id FROM directs WHERE director_username = '${username}');`;
            await runQuery(query);
            res.send("movie name changed successfully");
        }catch(err){
            res.send(err);
        }  
    }

    async allMovies(req,res){
        const username = req.body.username;
        try {
            const query = `SELECT m.movie_id, m.movie_name, ms.theatre_id, ms.timeslot, array_agg(p.predecessor_movie_id) AS predecessors_list FROM movie m JOIN directs d ON m.movie_id = d.movie_id LEFT JOIN preceeds p ON m.movie_id = p.successor_movie_id JOIN movie_session ms ON m.movie_id = ms.movie_id WHERE d.director_username = '${username}' GROUP BY m.movie_id, m.movie_name, ms.theatre_id, ms.timeslot ORDER BY m.movie_id ASC;`
            const result = await runQuery(query);
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    }
}

const directors = new Directors();

export default directors;