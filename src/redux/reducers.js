const initialState = {
    searchResults: [],
    userData: null,
    userRepos: [],
    repoDetails: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_USER':
        return { ...state, searchResults: action.payload };
      case 'FETCH_USER_DATA':
        return { ...state, userData: action.payload };
      case 'FETCH_USER_REPOS':
        return { ...state, userRepos: action.payload };
      case 'FETCH_REPO_DETAILS':
        return { ...state, repoDetails: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  