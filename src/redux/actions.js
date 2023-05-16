import axios from 'axios';

export const searchUser = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
    dispatch({ type: 'SEARCH_USER', payload: response.data.items });
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserData = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    dispatch({ type: 'FETCH_USER_DATA', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserRepos = (username) => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    dispatch({ type: 'FETCH_USER_REPOS', payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
