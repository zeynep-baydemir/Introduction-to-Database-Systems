import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectorComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');

  const [movieId, setMovieId] = useState('');
  const [movieName, setMovieName] = useState('');
  const [theatreId, settheatreId] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const [date, setDate] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [duration, setDuration] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [addMovieResult, setAddMovieResult] = useState('');

  const [succMovieId, setSuccMovieId] = useState('');
  const [predMovieList, setPredMovieList] = useState('');
  const [addPredResult, setAddPredResult] = useState('');
  
  const [availableSlot, setAvailableSlot] = useState('');
  const [avlResult, setAvlResult] = useState([]);

  const [movieIdofSession, setMovieIdofSession] = useState('');
  const [ticketsResult, setTicketsResult] = useState([]);
  
  const [updatedMovieName, setUpdatedMovieName] = useState('');
  const [updatedMovieId, setUpdatedMovieId] = useState('');
  const [updatedResult, setupdatedResult] = useState('');

  const [allMoviesResult, setAllMoviesResult] = useState([]);




useEffect(() => {
    const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
    if (isLoggedInDir === 'true') {
      console.log('User already logged in');
    }
}, []);

const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/directorLogin', { username, password });
      const loggedInUsername = response.data;
      const status = response.status;

      if (status === 200) {
        console.log(`Logged in as ${loggedInUsername}`);
        sessionStorage.setItem('isLoggedInDir', 'true');
        sessionStorage.setItem('username', loggedInUsername);
        setLoginResult('Successfully logged in!')
      } else {
        setLoginResult('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
};

const handleAddMovie = async () => {
    try {
      const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
      if (isLoggedInDir === 'true'){
        const response = await axios.post('http://localhost:8080/addMovie', 
        { username: sessionStorage.getItem('username'),
          movieId: movieId,
          movieName: movieName,
          theatreId: theatreId,
          timeslot: timeslot,
          date: date,
          genre_list: genreList,
          duration: duration,
          session_id: sessionId
          });

          setAddMovieResult(response.data)
        }
      else {
        setAddMovieResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
};

const handleAddPred = async () => {
    try {
      const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
      if (isLoggedInDir === 'true'){
        const response = await axios.post('http://localhost:8080/addPred', 
        {
          movieId1: succMovieId,
          movie_list: predMovieList,
          });

          setAddPredResult(response.data)
        }
      else {
        setAddPredResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
};

const handleTheatreAvailable = async () => {
  try {
    const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
    if (isLoggedInDir === 'true'){
      const response = await axios.post('http://localhost:8080/avlTheatres', 
      {
        slot: availableSlot,
        });

        setAvlResult(response.data)
      }
    else {
      setAvlResult('Please log in!');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const handleTicketAudience = async () => {
  try {
    const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
    if (isLoggedInDir === 'true'){
      const response = await axios.post('http://localhost:8080/ticketAudience', 
      {
        movieId: movieIdofSession,
        username: sessionStorage.getItem('username'),
        });

        setTicketsResult(response.data)
      }
    else {
      setTicketsResult('Please log in!');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const handleUpdateMovie = async () => {
  try {
    const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
    if (isLoggedInDir === 'true'){
      const response = await axios.post('http://localhost:8080/updateMovie', 
      {
        movieId: updatedMovieId,
        movieName: updatedMovieName,
        username: sessionStorage.getItem('username'),

        });

        setupdatedResult(response.data)
      }
    else {
      setupdatedResult('Please log in!');
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const handleAllMovies = async () => {
  try {
    const isLoggedInDir = sessionStorage.getItem('isLoggedInDir');
    if (isLoggedInDir === 'true'){
      const response = await axios.post('http://localhost:8080/allMovies', 
      {
        username: sessionStorage.getItem('username'),
      });

      setAllMoviesResult(response.data);
      console.log(response.data)
      }
    else {
      setAllMoviesResult(['Please log in!']);
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

      <h1>Add Movie</h1>
      <input type="number" placeholder="Movie Id" value={movieId} onChange={(e) => setMovieId(e.target.value)} />
      <input type="text" placeholder="Movie Name" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
      <input type="number" placeholder="Theatre Id" value={theatreId} onChange={(e) => settheatreId(e.target.value)} />
      <input type="number" placeholder="Timeslot" value={timeslot} onChange={(e) => setTimeslot(e.target.value)} />
      <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="text" placeholder="Genre List" value={genreList} onChange={(e) => setGenreList(e.target.value)} />
      <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <input type="number" placeholder="Session Id" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      <button onClick={handleAddMovie}>Add Movie</button>
      <div>
      {addMovieResult}
      </div>

      <h1>Add Predecessor Movie List</h1>
      <input type="number" placeholder="Successor Movie Id" value={succMovieId} onChange={(e) => setSuccMovieId(e.target.value)} />
      <input type="text" placeholder="Movie List" value={predMovieList} onChange={(e) => setPredMovieList(e.target.value)} />
      <button onClick={handleAddPred}>Add Movie</button>
      <div>
      {addPredResult}
      </div>

      <h1>Available Theatre</h1>
      <input type="text" placeholder="Timeslot" value={availableSlot} onChange={(e) => setAvailableSlot(e.target.value)} />
      <button onClick={handleTheatreAvailable}>Show</button>
      <div>
      {avlResult.map((the) => (
          <div key={the.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p>Theatre Id: {the.theatre_id}</p>
            <p>District: {the.district}</p>
            <p>Capacity: {the.theatre_capacity}</p>
          </div>
        ))}
      </div>

      <h1>Audiences Bought Ticket</h1>
      <input type="text" placeholder="Movie Id" value={movieIdofSession} onChange={(e) => setMovieIdofSession(e.target.value)} />
      <button onClick={handleTicketAudience}>Show</button>
      <div>
      {ticketsResult.map((the) => (
          <div key={the.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p> Username: {the.username}</p>
            <p> Name: {the.name}</p>
            <p>Surname: {the.surname}</p>
          </div>
        ))}
      </div>

      <h1>Update Movie Name</h1>
      <input type="number" placeholder="Movie Id" value={updatedMovieId} onChange={(e) => setUpdatedMovieId(e.target.value)} />
      <input type="text" placeholder="New Movie Name" value={updatedMovieName} onChange={(e) => setUpdatedMovieName(e.target.value)} />
      <button onClick={handleUpdateMovie}>Add Movie</button>
      <div>
      {updatedResult}
      </div>

      <h1>All Movies</h1>
      <button onClick={handleAllMovies}>Show Movies</button>
      <div>
      {allMoviesResult.map((movie) => (
          <div key={movie.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p> Movie Id: {movie.movie_id}</p>
            <p> Movie Name: {movie.movie_name}</p>
            <p> Theatre Id: {movie.theatre_id}</p>
            <p> Timeslot: {movie.timeslot}</p>
            <p>
        Predecessor Movies: {JSON.stringify(movie.predecessors_list)}
      </p>
          </div>
        ))}
      </div>
      

    </div>
    
  );
};

export default DirectorComponent;