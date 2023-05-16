import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser, fetchUserData, fetchUserRepos } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const searchResults =
useSelector((state) => state.searchResults);
const userData = useSelector((state) => state.userData);
const userRepos = useSelector((state) => state.userRepos);
const [username, setUsername] = useState('');

const handleSearch = () => {
dispatch(searchUser(username));
};

const handleUserSelect = (selectedUser) => {
dispatch(fetchUserData(selectedUser.login));
dispatch(fetchUserRepos(selectedUser.login));
};

return (
<div>
<h1>Github User Search</h1>
<input
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="Enter a username"
/>
<button onClick={handleSearch}>Search</button>
<ul>
{searchResults.map((user) => (
<li key={user.id} onClick={() => handleUserSelect(user)}>
{user.login}
</li>
))}
</ul>

css
Copy code
  {userData && (
    <div>
      <h2>{userData.name}</h2>
      <img src={userData.avatar_url} alt="User Avatar" />
      <p>Followers: {userData.followers}</p>
      {/* Display other user stats here */}
    </div>
  )}

  <h2>User Repositories</h2>
  <ul>
    {userRepos.map((repo) => (
      <li key={repo.id}>{repo.name}</li>
    ))}
  </ul>
</div>
);
}

export default App;