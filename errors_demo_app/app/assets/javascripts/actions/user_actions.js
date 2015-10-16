UserActions = {
  createUser: function (user) {
    ApiUtil.createUser(user);
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_CREATION_PENDING
    });
  },

  creationSuccess: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_CREATION_SUCCESS,
      user: user
    });
  },

  creationError: function (errors) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_CREATION_ERROR,
      errors: errors
    });
  },
}