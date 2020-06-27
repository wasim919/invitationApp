const taskReducer = (
  state = { tokens: {}, invites: [], nextId: 1 },
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        tokens: action.payload,
      };
    case 'ADD_INVITE':
      return {
        ...state,
        invites: [
          ...state.invites,
          {
            index: state.nextId,
            email: action.payload.email,
            mobile: action.payload.mobile,
          },
        ],

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
