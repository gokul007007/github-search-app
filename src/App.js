import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser, fetchUserData, fetchUserRepos, fetchRepoDetails } from './redux/actions';
import { ListGroup, Card } from 'react-bootstrap';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const userData = useSelector((state) => state.userData);
  const userRepos = useSelector((state) => state.userRepos);
  const repoDetails = useSelector((state) => state.repoDetails);
  const [username, setUsername] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSearch = () => {
    dispatch(searchUser(username));
  };

  const handleUserSelect = (selectedUser) => {
    dispatch(fetchUserData(selectedUser.login));
    dispatch(fetchUserRepos(selectedUser.login));
    const updatedSearchResults = searchResults.filter((user) => user.id === selectedUser.id);
    dispatch(searchUser(updatedSearchResults));
  };

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
    dispatch(fetchRepoDetails(repo.owner.login, repo.name));
  };

  return (
    <div className='app container'>
      <h1>GITHUB USERS SEARCH</h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Enter a username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </div>
      </div>
      <div className="d-grid mt-2 col-6 mx-auto">
        <button onClick={handleSearch} className="btn btn-outline-success" type="button">
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <ListGroup className="mt-3">
          {searchResults.map((user) => (
            <ListGroup.Item
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => handleUserSelect(user)}
              style={{ cursor: 'pointer' }}
            >
              {user.login}
              <span className="badge bg-primary rounded-pill">View</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <img src={userData.avatar_url} alt="User Avatar" />
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Location: {userData.location}</p>
          
        </div>
      )}
      {userRepos.length > 0 && (
        <div>
          <h2>User Repositories</h2>
          <div className="row">
            {userRepos.map((repo) => (
              <div className="col-md-4 mb-3" key={repo.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{repo.name}</Card.Title>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleRepoSelect(repo)}
                    >
                      View Details
                    </button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedRepo && repoDetails && (
  <div>
    <h3>{selectedRepo.name}</h3>
    <p>Commits: {repoDetails.commits}</p>
    <p>Forks: {repoDetails.forks}</p>
    <p>Issues: {repoDetails.issues}</p>
  </div>
)}
    </div>
  );
}

export default App;
