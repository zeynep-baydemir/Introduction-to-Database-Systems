import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');

  const [audienceName, setAudienceName] = useState('');
  const [audienceSurname, setAudienceSurname] = useState('');
  const [audienceUsername, setAudienceUsername] = useState('');
  const [audiencePassword, setAudiencePassword] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [directorSurname, setDirectorSurname] = useState('');
  const [directorUsername, setDirectorUsername] = useState('');
  const [directorPassword, setDirectorPassword] = useState('');
  const [directorNation, setDirectorNation] = useState('');
  const [addAudienceResult, setAddAudienceResult] = useState('');
  const [addDirectorResult, setAddDirectorResult] = useState('');

  const [deleteUsername, setDeleteUsername] = useState('');
  const [deleteAudienceResult, setDeleteAudienceResult] = useState('');

  const [platformId, setPlatformId] = useState('');
  const [platformDirector, setPlatformDirector] = useState('');
  const [platformResult, setPlatformResult] = useState('');

  const [viewDirectorsResult,setViewDirectorsResult] = useState([]);
  const [ratingAudienceResult,setRatingAudienceResult] = useState([]);
  const [ratingAudienceUsername, setRatingAudienceUsername] = useState('');

  const [movieId, setMovieId] = useState('');
  const [movieRatingResult, setMovieRatingResult] = useState([]);

  const [directorMovies, setDirectorMovies] = useState('');
  const [directorMoviesResult, setdirectorMoviesResult] = useState([])


  

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      console.log('User already logged in');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/databaseLogin', { username, password });
      const loggedInUsername = response.data;
      const status = response.status;

      if (status === 200) {
        console.log(`Logged in as ${loggedInUsername}`);
        sessionStorage.setItem('isLoggedIn', 'true');
        setLoginResult('Successfully logged in!')
      } else {
        setLoginResult('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const handleAddAudience = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.post('http://localhost:8080/addAudience', {
          username: audienceUsername,
          password: audiencePassword,
          name: audienceName,
          surname: audienceSurname,
        });
        setAddAudienceResult(response.data);
      } else {
        setAddAudienceResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleAddDirector = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
      const response = await axios.post('http://localhost:8080/addDirector', {
        username: directorUsername,
        password: directorPassword,
        name: directorName,
        surname: directorSurname,
        nation: directorNation
      });  
      setAddDirectorResult(response.data)
      } else {
        setAddDirectorResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleDeleteAudience = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.post('http://localhost:8080/deleteAudience', {
          username: deleteUsername,
        });
        setDeleteAudienceResult(response.data);
      } else {
        setDeleteAudienceResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleUpdatePlatformId = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.post('http://localhost:8080/updatePlatformId', {
          platformId: platformId,
          username: platformDirector,

        });
        setPlatformResult(response.data);
      } else {
        setPlatformResult('Please log in!');
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleViewDirectors = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.get('http://localhost:8080/viewDirectors');
        console.log(response.data);
        setViewDirectorsResult(response.data);
      } else {
        setViewDirectorsResult([['Please log in!']]);
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleRatingAudience = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.post('http://localhost:8080/ratingAudience',{
          username:ratingAudienceUsername
        });
        console.log(response.data);
        setRatingAudienceResult(response.data);
      } else {
        setRatingAudienceResult(['Please log in!']);
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleMovieRating = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.post('http://localhost:8080/movieRating',{
          movieId: movieId
        });
        setMovieRatingResult(response.data);
      } else {
        setMovieRatingResult(['Please log in']);
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
    }
  };

  const handleDirectorMovies = async () => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        const response = await axios.post('http://localhost:8080/directorMovies',{
          username: directorMovies
        });
        setdirectorMoviesResult(response.data);
      } else {
        setdirectorMoviesResult([['Please log in']]);
      }
    } catch (error) {
      console.error('Error occurred while adding audience:', error);
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

      <h1>Add Audience</h1>
      <input type="text" placeholder="Username" value={audienceUsername} onChange={(e) => setAudienceUsername(e.target.value)} />
      <input type="text" placeholder="Name" value={audienceName} onChange={(e) => setAudienceName(e.target.value)} />
      <input type="text" placeholder="Surname" value={audienceSurname} onChange={(e) => setAudienceSurname(e.target.value)} />
      <input type="password" placeholder="Password" value={audiencePassword} onChange={(e) => setAudiencePassword(e.target.value)} />
      <button onClick={handleAddAudience}>Add Audience</button>
      <div>
      {addAudienceResult}
      </div>

      <h1>Add Director</h1>
      <input type="text" placeholder="Username" value={directorUsername} onChange={(e) => setDirectorUsername(e.target.value)} />
      <input type="text" placeholder="Name" value={directorName} onChange={(e) => setDirectorName(e.target.value)} />
      <input type="text" placeholder="Surname" value={directorSurname} onChange={(e) => setDirectorSurname(e.target.value)} />
      <input type="password" placeholder="Password" value={directorPassword} onChange={(e) => setDirectorPassword(e.target.value)} />
      <input type="text" placeholder="Nation" value={directorNation} onChange={(e) => setDirectorNation(e.target.value)} />
      <button onClick={handleAddDirector}>Add Director</button>
      <div>
      {addDirectorResult}
      </div>

      <h1>Delete Audience</h1>
      <input type="text" placeholder="Username" value={deleteUsername} onChange={(e) => setDeleteUsername(e.target.value)} />
      <button onClick={handleDeleteAudience}>Delete Audience</button>
      <div>
      {deleteAudienceResult}
      </div>

      <h1>Update Platform Id</h1>
      <input type="text" placeholder="platform id" value={platformId} onChange={(e) => setPlatformId(e.target.value)} />
      <input type="text" placeholder="username" value={platformDirector} onChange={(e) => setPlatformDirector(e.target.value)} />
      <button onClick={handleUpdatePlatformId}>Update Platform Id</button>
      <div>
      {platformResult}
      </div>

      <h1>View Directors</h1>
      <button onClick={handleViewDirectors}>Show Directors</button>
      <div>
      {viewDirectorsResult.map((director) => (
          <div key={director.username} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p>Username: {director.username}</p>
            <p>Name: {director.name}</p>
            <p>Surname: {director.surname}</p>
            <p>Nation: {director.nation}</p>
            <p>Platform Id: {director.platform_id}</p>
          </div>
        ))}
      </div>
      <h1>Ratings for Audience</h1>
      <input type="text" placeholder="Username" value={ratingAudienceUsername} onChange={(e) => setRatingAudienceUsername(e.target.value)} />
      <button onClick={handleRatingAudience}>Show Ratings</button>
      <div>
      {ratingAudienceResult.map((rating) => (
          <div key={rating.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p>Movie Id: {rating.movie_id}</p>
            <p>Movie Name: {rating.movie_name}</p>
            <p>Rating: {rating.rating}</p>
          </div>
        ))}
      </div>
      <h1>Movie Rating</h1>
      <input type="text" placeholder="Movie Id" value={movieId} onChange={(e) => setMovieId(e.target.value)} />
      <button onClick={handleMovieRating}>Show Movie Ratings</button>
      <div>
      {movieRatingResult.map((rating) => (
          <div key={rating.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p>Movie Id: {rating.movie_id}</p>
            <p>Movie Name: {rating.movie_name}</p>
            <p>Rating: {rating.average_rating}</p>
          </div>
        ))}
      </div>

      <h1>Movies of Director</h1>
      <input type="text" placeholder="Director Username" value={directorMovies} onChange={(e) => setDirectorMovies(e.target.value)} />
      <button onClick={handleDirectorMovies}>Show Movies of Director</button>
      <div>
      {directorMoviesResult.map((rating) => (
          <div key={rating.movie_id} style={{ marginBottom: '50px' ,marginLeft: '20px'}}>
            <p>Movie Id: {rating.movie_id}</p>
            <p>Movie Name: {rating.movie_name}</p>
            <p>Theatre Id: {rating.theatre_id}</p>
            <p>Theatre District: {rating.district}</p>
            <p>Timeslot: {rating.timeslot}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default YourComponent;