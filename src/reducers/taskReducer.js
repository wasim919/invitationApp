const initialState = {
  tokens: {},
  username: '',
  isLogged: false,
  invites: [],
  nextId: 1,
};

const storeInvitesInLocalStorage = (newInvite) => {
  const newData = { ...newInvite };
  let newUserData = [];
  if (localStorage.getItem('userData') == null) {
    newUserData.push(newData);
  } else {
    newUserData = JSON.parse(localStorage.getItem('userData'));
    newUserData.push(newData);
  }
  localStorage.setItem('userData', JSON.stringify(newUserData));
};

const storeUserInfoWithInvites = () => {
  let modifiedUserData = [];
  const username = localStorage.getItem('username');
  if (username != null) {
    const invites = JSON.parse(localStorage.getItem('userData'));
    localStorage.removeItem('userData');
    modifiedUserData.push({
      username,
      invites,
    });
    localStorage.setItem('userData', JSON.stringify(modifiedUserData));
  }
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLogged', action.payload.isLogged);
      localStorage.setItem('tokens', action.payload.tokens);
      localStorage.setItem('username', action.payload.username);
      return {
        ...state,
        username: action.payload.username,
        isLogged: action.payload.isLogged,
        tokens: action.payload.tokens,
      };

    case 'LOGOUT':
      storeUserInfoWithInvites();

      return {
        ...state,
        isLogged: action.payload.isLogged,
        tokens: action.payload.tokens,
      };
    case 'ADD_INVITE':
      const newInvites = [
        ...state.invites,
        {
          index: state.nextId,
          email: action.payload.email,
          mobile: action.payload.mobile,
        },
      ];

      storeInvitesInLocalStorage({
        index: state.nextId,
        email: action.payload.email,
        mobile: action.payload.mobile,
      });

      return {
        ...state,
        invites: [...newInvites],

        nextId: state.nextId + 1,
      };
    case 'REMOVE_INVITE':
      const index = action.payload;
      state.invites.splice(index, 1);
      return {
        ...state,
        invites: [...state.invites],
      };
    default:
      return state;
  }
};

export default taskReducer;
