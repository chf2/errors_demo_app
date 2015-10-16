(function(root){
  var _users = [];
  
  var addUser = function (user) {
    _users.push(user)
  };

  var USER_CREATION_EVENT = "USER_CREATION_EVENT";

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    addUserCreationListener: function (cb) {
      this.on(USER_CREATION_EVENT, cb);
    },

    removeUserCreationListener: function (cb) {
      this.removeListener(USER_CREATION_EVENT, cb);
    },

    dispatcherId: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case UserConstants.USER_CREATION_SUCCESS:
          addUser(payload.user);
          UserStore.emit(
            USER_CREATION_EVENT, 
            UserConstants.USER_CREATION_SUCCESS            
          )
          break;
        case UserConstants.USER_CREATION_ERROR:
          UserStore.emit(
            USER_CREATION_EVENT, 
            UserConstants.USER_CREATION_ERROR,
            payload.errors
          )
          break;
        case UserConstants.USER_CREATION_PENDING:
          UserStore.emit(
            USER_CREATION_EVENT, 
            UserConstants.USER_CREATION_PENDING            
          )
          break;
      }
    })
  });

})(this);