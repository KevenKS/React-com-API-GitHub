import logo from './logo.svg';
import './App.css';
import GithubImage from './GitHub-Mark.png'
import { useState } from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.github.com/users/${search}`) //Só o fetch já dispara a requisição para api
    .then(response => response.json()) // Converter resposta para formato json (Json é o retorno padrão da api do git)
    .then(userResponse => setUserData(userResponse));
  }

  const handleChange = (event) =>{
    setSearch(event.target.value);
  }

  return (
    <div className="container text-center">
      <h1 className="py-5 text-uppercase">GitHub profile </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input type="text" className="form-control" value={search} onChange={handleChange} required/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </span>
          </div>
        </div>
      </form>
      <div className="py-4">
        {!userData && (
          <img src={GithubImage} className="responsive rounded-circle" height="200px" alt=""/>)}
        {userData && (
          <div> 
            <img src={userData.avatar_url} className="responsive rounded-circle" height="200px" alt=""/>
            <h1 className="pt-5">
              <a href="https://github.com" target="_new">{userData.name}</a>
            </h1>
            <h3>
              {userData.location}
            </h3>
            <h3>
              {userData.bio}
            </h3>
            <p>
              <a href={userData.blog} target="_new" className="text-info">
                {userData.blog}
              </a>
            </p>
          </div>
          )}
        
      </div>
    </div>
  );
}

export default App;
