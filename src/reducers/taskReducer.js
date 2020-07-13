import { bindActionCreators } from 'redux';

const cleanLocalStorage = () => {
  localStorage.clear();
};

const initialState = {
  token: '',
  user: {},
  isLogged: false,
  userPosts: [],
  userFollowingPosts: [],
  nextId: 0,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLogged', JSON.stringify(action.payload.isLogged));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token,
      };
    case 'SET_USER_DETAILS':
      return {
        ...state,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          followers: action.payload.followers,
          following: action.payload.following,
        },
      };
    case 'SET_USER_POSTS':
      return {
        ...state,
        userPosts: action.payload.posts,
      };
    case 'REGISTER':
      return {
        ...state,
        isLogged: action.payload.isLogged,
      };

    case 'LOGOUT':
      cleanLocalStorage();

      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token,
        // invites: action.payload.invites,
      };

    // case 'ADD_INVITE':
    //   if (!action.payload.email || !action.payload.mobile) {
    //     return state;
    //   }
    //   const newInvite = {
    //     index: state.nextId,
    //     email: action.payload.email,
    //     mobile: action.payload.mobile,
    //   };
    //   const newInvites = [...state.invites, newInvite];

    //   storeInviteInLocalStorage(newInvites);

    //   return {
    //     ...state,
    //     invites: [...newInvites],

    //     nextId: state.nextId + 1,
    //   };

    // case 'REMOVE_INVITE':
    //   const index = action.payload;
    //   state.invites.splice(index, 1);
    //   removeItemInLocalStorage(index);
    //   return {
    //     ...state,
    //     invites: [...state.invites],
    //   };

    default:
      return state;
  }
};

export default taskReducer;
