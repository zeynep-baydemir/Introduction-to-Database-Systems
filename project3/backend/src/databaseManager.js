import {runQuery} from "./runQuery.js";

class DatabaseManager{
    async login(req,res){
        const {username, password} = req.body;
        try{
            const query = `SELECT * FROM database_managers WHERE username = '${username}' AND password = '${password}';`;
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
    
    async addAudience(req, res){
            const {username, name, surname, password} = req.body;
            try{
                const query = `INSERT INTO audience (username, name, surname, password) VALUES ('${username}', '${name}', '${surname}','${password}');`;
                runQuery(query);
                res.status(201).send("successfully inserted audience")
            }catch(err){
                res.send(err);
        }
    }

    async addDirector(req, res){
            const {username, name, surname, password, nation} = req.body;
            try{
                const query = `INSERT INTO director(username, name, surname, password, nation) VALUES ('${username}', '${name}', '${surname}','${password}','${nation}');`;
                runQuery(query);
                res.status(201).send("successfully inserted director")
            }catch(err){
                res.send(err);
        }     
    }

    async deleteAudience(req,res){
        const username = req.body.username;
        try {
            const query = `DELETE FROM audience WHERE username = '${username}';`;
            const rows = await runQuery(query);
            res.send('audience deleted successfully');
        }
        catch(err){
            res.send(err);
        }   
    }

    async updatePlatformId(req, res){
        const {platformId, username} = req.body;
        try{
            const query = `Update agrees SET platform_id = '${platformId}' WHERE director_username = '${username}';`;
            runQuery(query);
            res.status(201).send("successfully updated platform id of the director")
        }catch(err){
            res.send(err);
        }       
    }

    async viewDirectors(req, res){
        try{
        const query = "SELECT director.username, director.name, director.surname, director.nation, agrees.platform_id FROM director JOIN agrees ON agrees.director_username = director.username;";
        const rows = await runQuery(query);
        res.send(rows);
        }catch(err){
        res.send(err);
        }        
    }

    async ratingForAudience(req,res){
        const username = req.body.username;
        try {
            const query = `SELECT rating.movie_id, movie.movie_name, rating.rating FROM rating JOIN movie ON movie.movie_id = rating.movie_id WHERE rating.audience_username = '${username}';`;
            const rows = await runQuery(query);
            res.send(rows);
        }
        catch(err){
            res.send(err);
        }   
    }
    async directorMovies(req,res){
        const director_username = req.body.username;
        try {
            const query = `SELECT directs.movie_id, movie.movie_name,theatre.theatre_id, theatre.district, movie_session.timeslot FROM directs JOIN movie ON directs.movie_id = movie.movie_id JOIN movie_session ON movie_session.movie_id = movie.movie_id JOIN director ON directs.director_username = director.username JOIN theatre ON movie_session.theatre_id = theatre.theatre_id  WHERE director.username = '${director_username}';`;
            const rows = await runQuery(query);
            res.send(rows);
        }
        catch(err){
            res.send(err);
        }   
    }  

    async movieRating(req,res){
        const movieId = req.body.movieId;
        try {
            const query = `SELECT movie_id, movie_name, average_rating FROM movie WHERE movie_id = ${movieId};`;
            const rows = await runQuery(query);
            res.send(rows);
        }
        catch(err){
            res.send(err);
        }   
    } 
}
const databaseManager = new DatabaseManager();

export default databaseManager;