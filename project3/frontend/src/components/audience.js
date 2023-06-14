import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AudienceComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginResult, setLoginResult] = useState('');
    const [listMoviesResult, setListMoviesResult] = useState([]);

    const [rateMovieResult,setRateMovieResult] = useState('');
    const [rating_movie_id,setRatingMovie] = useState('');
    const [rating_float,setRatingMovieValue] = useState('');

    const [buyTicketResult,setBuyTicketResult] = useState('');
    const [sessionId,setSessionId] = useState('');

    const [showTicketsResult, setShowTicketsResult] = useState([]);


  useEffect(() => {
      const isLoggedInAud = sessionStorage.getItem('isLoggedInAud');
      if (isLoggedInAud === 'true') {
          console.log('User already logged in');
      }
  }, []);

  const handleLogin = async () => {
          try {
            const response = await axios.post('http://localhost:8080/audienceLogin', { username, password });
            const loggedInUsername = response.data;
            const status = response.status;
            if (status === 200) {
              console.log(`Logged in as ${loggedInUsername}`);
              sessionStorage.setItem('isLoggedInAud', 'true');
              sessionStorage.setItem('username', loggedInUsername);
              setLoginResult('Successfully logged in!');
            } else {
              setLoginResult('Login failed');
            }
          } catch (error) {
            console.error('Error occurred during login:', error);
          }
      };
  const handleListMovies = async () => {
      try {
        const isLoggedInAud = sessionStorage.getItem('isLoggedInAud');
        if (isLoggedInAud === 'true'){
          const response = await axios.get('http://localhost:8080/listMovies')
          setListMoviesResult(response.data);
          console.log(response.data)
          }
        else {
          setListMoviesResult(['Please log in!']);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    const handleBuyTicket = async () => {
      try {
        const isLoggedInAud = sessionStorage.getItem('isLoggedInAud');
        if (isLoggedInAud === 'true'){
          const response = await axios.post('http://localhost:8080/buyTicket',{
            session_id: sessionId,
            username: sessionStorage.getItem('username')
          })
          setBuyTicketResult(response.data);
          console.log(response.data)
          }
        else {
          setBuyTicketResult('Please log in!');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    const handleShowTickets = async () => {
      try {
        const isLoggedInAud = sessionStorage.getItem('isLoggedInAud');
        if (isLoggedInAud === 'true'){
          const response = await axios.post('http://localhost:8080/viewTickets',{
            session_id: sessionId,
            username: sessionStorage.getItem('username')
          })
          setShowTicketsResult(response.data);
          console.log(response.data)
          }
        else {
          setShowTicketsResult(['Please log in!']);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

  const handleRateMovie = async () => {
    try {
      const isLoggedInAud = sessionStorage.getItem('isLoggedInAud');
      if (isLoggedInAud === 'true'){
        const response = await axios.post('http://localhost:8080/rateMovie',{
          movie_id: rating_movie_id,
          rating: rating_float,
          username: sessionStorage.getItem('username')
        });
        setRateMovieResult(response.data);
        console.log(response.data)
        }
      else {
        setRateMovieResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

return (
    <div>

    <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <div>
      {loginResult}
      </div>

    <h1>List Movies</h1>
      <button onClick={handleListMovies}>Show Movies</button>
      <div>
      {listMoviesResult.map((movie) => (
          <div key={movie.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p> Movie Id: {movie.movie_id}</p>
            <p> Movie Name: {movie.movie_name}</p>
            <p> Surname: {movie.surname}</p>
            <p> Platform Name: {movie.platform_name}</p>
            <p> Theatre Id: {movie.theatre_id}</p>
            <p> Timeslot: {movie.timeslot}</p>
            <p>
        Predecessor Movies: {JSON.stringify(movie.predecessors_list)}
            </p>
        </div>
        ))}
      </div>


    <h1>Buy Ticket</h1>
    <input type="text" placeholder="Session Id" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />

      <button onClick={handleBuyTicket}>Buy</button>
      <div>
      {buyTicketResult}
      </div>

    <h1>Show Tickets</h1>
      <button onClick={handleShowTickets}>Show Tickets</button>
      <div>
      {showTicketsResult.map((ticket) => (
          <div key={ticket.session_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p> Session Id: {ticket.session_id}</p>
            <p> Movie Id: {ticket.movie_id}</p>
            <p> Movie Name: {ticket.movie_name}</p>
            <p> Rating: {ticket.rating}</p>
            <p> Average Rating: {ticket.average_rating}</p>
        </div>
        ))}
      </div>

    <h1>Rate Movie</h1>
    <input type="text" placeholder="Movie Id" value={rating_movie_id} onChange={(e) => setRatingMovie(e.target.value)} />
    <input type="text" placeholder="Rating" value={rating_float} onChange={(e) => setRatingMovieValue(e.target.value)} />

      <button onClick={handleRateMovie}>Rate Movie</button>
      <div>
      {rateMovieResult}
      </div>
    </div>
    
  );
};

export default AudienceComponent;