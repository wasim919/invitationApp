const cleanLocalStorage = () => {
  localStorage.clear();
};

// const removeItemInLocalStorage = (index) => {
//   let newInvites = [];
//   let newUserData = [];
//   let oldUsersData = [];
//   if (localStorage.getItem('userData') != null) {
//     let flag = 1;
//     const username = localStorage.getItem('username');
//     const userData = JSON.parse(localStorage.getItem('userData'));

//     localStorage.removeItem('userData');
//     for (let i = 0; i < userData.length; ++i) {
//       flag = 1;
//       if (userData[i].username === username) {
//         // console.log('hello in');
//         // console.log(userData[i].username);
//         // console.log(username);
//         // console.log('hello out');
//         for (let j = 0; j < userData[i].invites.length; ++j) {
//           if (userData[i].invites[j].index !== index) {
//             flag = 0;
//             newInvites.push(userData[i].invites[j]);
//           }
//         }
//         if (flag === 0) {
//           newUserData.push({
//             username: username,
//             invites: newInvites,
//           });
//           break;
//         }
//       } else {
//         oldUsersData.push(userData[i]);
//       }
//     }

//     if (newUserData.length === 0 && oldUsersData.length === 0) {
//       localStorage.removeItem('userData');
//       return;
//     }
//     // console.log(newUserData);
//     // console.log(index);
//     // console.log(oldUsersData);
//     localStorage.setItem(
//       'userData',
//       JSON.stringify([...oldUsersData, ...newUserData])
//     );
//   }
//   return;
// };

// const storeInviteInLocalStorage = (invites) => {
//   const username = localStorage.getItem('username');
//   const newInvites = [...invites];
//   // console.log(newInvites);
//   let modifiedUserData = [];
//   let flag = 1;
//   if (localStorage.getItem('userData') != null) {
//     modifiedUserData = JSON.parse(localStorage.getItem('userData'));
//     localStorage.removeItem('userData');
//     for (let i = 0; i < modifiedUserData.length; ++i) {
//       if (modifiedUserData[i].username === username) {
//         flag = 0;
//         modifiedUserData[i].invites = newInvites;
//         break;
//       }
//     }
//     if (flag === 1) {
//       modifiedUserData.push({ username, invites: newInvites });
//     }
//   } else {
//     modifiedUserData.push({
//       username,
//       invites: newInvites,
//     });
//   }
//   // console.log(modifiedUserData);
//   localStorage.setItem('userData', JSON.stringify(modifiedUserData));
// };

const initialState = {
  token: '',
  username: '',
  isLogged: false,
  posts: [],
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
