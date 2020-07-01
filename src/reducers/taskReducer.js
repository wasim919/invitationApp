const initialState = {
  tokens: {},
  username: '',
  isLogged: false,
  invites: [],
  nextId: 0,
};

const cleanLocalStorage = () => {
  localStorage.removeItem('tokens');
  localStorage.removeItem('username');
  localStorage.removeItem('isLogged');
};

// const storeInvitesInLocalStorage = (newInvite) => {
//   const newData = { ...newInvite };
//   let newUserData = [];
//   if (localStorage.getItem('loggedInvites') == null) {
//     newUserData.push(newData);
//   } else {
//     newUserData = JSON.parse(localStorage.getItem('loggedInvites'));
//     newUserData.push(newData);
//   }
//   console.log(newUserData);
//   localStorage.setItem('loggedInvites', JSON.stringify(newUserData));
// };

// const storeUserInfoWithInvites = () => {
//   let modifiedUserData = [];

//   const username = localStorage.getItem('username');

// if (username != null) {
//   if (localStorage.getItem('userData') != null) {
//     modifiedUserData = JSON.parse(localStorage.getItem('userData'));
//   }
//   const loggedInvites = JSON.parse(localStorage.getItem('loggedInvites'));
//   if (loggedInvites != null) {
//     modifiedUserData.push({
//       username,
//       invites: [...loggedInvites],
//     });
//   }

//     cleanLocalStorage();

//     localStorage.setItem('userData', JSON.stringify(modifiedUserData));
//   }
// };

const removeItemInLocalStorage = (index) => {
  let newInvites = [];
  let newUserData = [];
  if (localStorage.getItem('userData') != null) {
    let flag = 1;
    const username = localStorage.getItem('username');
    const userData = JSON.parse(localStorage.getItem('userData'));
    localStorage.removeItem('userData');
    for (let i = 0; i < userData.length; ++i) {
      flag = 1;
      if (userData[i].username === username) {
        for (let j = 0; j < userData[i].invites.length; ++j) {
          if (userData[i].invites[j].index !== index) {
            flag = 0;
            newInvites.push(userData[i].invites[j]);
          }
        }
        if (flag == 0) {
          newUserData.push({
            username: username,
            invites: newInvites,
          });
          break;
        }
      }
    }
    console.log(newInvites);
    console.log('hello');
    console.log(newUserData);
    if (newUserData.length === 0) {
      localStorage.removeItem('userData');
      return;
    }
    localStorage.setItem('userData', JSON.stringify(newUserData));
  }
  return;
};

const storeInviteInLocalStorage = (invite) => {
  const username = localStorage.getItem('username');
  const newInvite = [...invite];
  console.log(newInvite);
  let modifiedUserData = [];
  let flag = 1;
  if (localStorage.getItem('userData') != null) {
    modifiedUserData = JSON.parse(localStorage.getItem('userData'));
    localStorage.removeItem('userData');
    for (let i = 0; i < modifiedUserData.length; ++i) {
      if (modifiedUserData[i].username == username) {
        flag = 0;
        modifiedUserData[i].invites = newInvite;
        break;
      }
    }
  } else {
    modifiedUserData.push({
      username,
      invites: newInvite,
    });
  }
  console.log(modifiedUserData);
  localStorage.setItem('userData', JSON.stringify(modifiedUserData));
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLogged', action.payload.isLogged);
      localStorage.setItem('tokens', JSON.stringify(action.payload.tokens));
      localStorage.setItem('username', action.payload.username);
      return {
        ...state,
        username: action.payload.username,
        isLogged: action.payload.isLogged,
        tokens: action.payload.tokens,
      };

    case 'LOGOUT':
      cleanLocalStorage();

      return {
        ...state,
        isLogged: action.payload.isLogged,
        tokens: action.payload.tokens,
        invites: action.payload.invites,
      };

    case 'ADD_INVITE':
      if (!action.payload.email || !action.payload.mobile) {
        return state;
      }
      const newInvite = {
        index: state.nextId,
        email: action.payload.email,
        mobile: action.payload.mobile,
      };
      const newInvites = [...state.invites, newInvite];

      storeInviteInLocalStorage(newInvites);

      return {
        ...state,
        invites: [...newInvites],

        nextId: state.nextId + 1,
      };

    case 'REMOVE_INVITE':
      const index = action.payload;
      state.invites.splice(index, 1);
      removeItemInLocalStorage(index);
      return {
        ...state,
        invites: [...state.invites],
      };

    default:
      return state;
  }
};

export default taskReducer;
