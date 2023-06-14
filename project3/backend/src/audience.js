import {runQuery} from "./runQuery.js";

class Audience{
    async login(req,res){
        const {username, password} = req.body;
        try{
            const query = `SELECT * FROM audience WHERE username = '${username}' AND password = '${password}';`;
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

    async listMovie(req, res){
        try{
            const query = `SELECT DISTINCT movie_session.movie_id, movie.movie_name, director.surname, rating_platform.platform_name, movie_session.theatre_id, movie_session.timeslot,  array_agg(p.predecessor_movie_id) AS predecessors_list FROM directs JOIN director ON directs.director_username = director.username JOIN movie ON directs.movie_id = movie.movie_id JOIN movie_session ON movie_session.movie_id = movie.movie_id LEFT JOIN agrees ON agrees.director_username = director.username LEFT JOIN rating_platform ON rating_platform.platform_id = agrees.platform_id LEFT JOIN preceeds p ON p.successor_movie_id = movie.movie_id GROUP BY movie_session.movie_id, movie.movie_name, director.surname, rating_platform.platform_name, movie_session.theatre_id, movie_session.timeslot;`;
            const result = await runQuery(query);
            res.status(201).send(result)
        }catch(err){
            res.send(err);
        }  
    }

    async ticketBuying(req, res){
        try{
            const username = req.body.username;
            const session_id = req.body.session_id;
            const buyTicketQ = `SELECT DISTINCT preceeds.predecessor_movie_id FROM buy_ticket JOIN movie_session ON buy_ticket.session_id = movie_session.session_id JOIN preceeds ON movie_session.movie_id = preceeds.successor_movie_id WHERE buy_ticket.session_id = ${session_id} AND buy_ticket.audience_username = '${username}' ORDER BY preceeds.predecessor_movie_id ASC;`;
            const btresult = await runQuery(buyTicketQ);
            const preceedsQ = `SELECT DISTINCT preceeds.predecessor_movie_id FROM preceeds JOIN movie_session ON movie_session.movie_id = preceeds.successor_movie_id WHERE movie_session.session_id = ${session_id} ORDER BY  preceeds.predecessor_movie_id ASC;`;
            const preresult = await runQuery(preceedsQ);

            if (preresult.length !== btresult.length) {
                res.send("Please watch predecessor movies")
              } else {
                let equal = true;
              
                for (let i = 0; i < preresult.length; i++) {
                  if (preresult[i].predecessor_movie_id !== btresult[i].predecessor_movie_id) {
                    equal = false;
                    break;
                  }
                }
            
            if (equal) {
                const theatreQ = `SELECT COUNT(buy_ticket.audience_username) FROM buy_ticket JOIN movie_session ON movie_session.session_id = buy_ticket.session_id JOIN theatre ON movie_session.theatre_id = theatre.theatre_id WHERE buy_ticket.session_id = ${session_id}; `
                const ticketNumber = await runQuery(theatreQ);
                const capacityQ = `SELECT theatre_capacity FROM theatre JOIN movie_session ON movie_session.theatre_id = theatre.theatre_id WHERE movie_session.session_id = ${session_id}; `
                const capacity = await runQuery(capacityQ);
                if(ticketNumber[0].count < capacity[0].theatre_capacity){
                    const ticketQ = `INSERT INTO buy_ticket VALUES(${session_id}, '${username}');`
                    await runQuery(ticketQ);
                    res.send("Ticket is successfully bought.")
                }
                else{
                    res.send("This session is full. Choose different session")
                }
            }
            else {
                res.send("Please watch predecessor movies")
            }
            }
        }catch(err){
            res.send(err);
        }  
    }

    async viewTickets(req,res){
        try {
            const username = req.body.username;
            const query = `SELECT movie_session.session_id,movie_session.movie_id, movie.movie_name, rating.rating, movie.average_rating FROM movie_session JOIN movie ON movie_session.movie_id = movie.movie_id LEFT JOIN rating ON rating.audience_username = 'audience2' AND rating.movie_id = movie_session.movie_id JOIN buy_ticket ON buy_ticket.session_id = movie_session.session_id WHERE buy_ticket.audience_username = '${username}';`;
            const result = await runQuery(query);
            res.send(result);
        } catch (error) {
            res.send(error);
        }
    }

    async rateMovie(req, res){
        try{
            const username = req.body.username;
            const movie_id = req.body.movie_id;
            const rating = req.body.rating;
            const query = `INSERT INTO rating VALUES ('${username}', ${movie_id}, ${rating});`;
            await runQuery(query);
            res.send("rating added successfully");

                
        }catch(err){
            res.send(err);
        }  
    }
}

const audience = new Audience();

export default audience;