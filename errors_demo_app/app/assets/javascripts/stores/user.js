(function(root){
  var _users = [];

  var _errors = [];

  var _currentStatus = UserConstants.CREATION_STATUSES.NONE;

  var setStatus = function (status) {
    _currentStatus = status;
  }
  
  var addUser = function (user) {
    _users.push(user)
  };

  var populateErrors = function (errors) {
    _errors = errors;
  };

  var USER_CREATION_EVENT = "USER_CREATION_EVENT";

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _users.slice();
    },

    getErrors: function () {
      var newErrors = _errors.slice()
      _errors = [];
      return newErrors.slice();
    },

    getStatus: function () {
      return _currentStatus;
    },

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
          setStatus(CREATION_STATUSES.SUCCESS);
          UserStore.emit(USER_CREATION_EVENT)
          break;
        case UserConstants.USER_CREATION_ERROR:
          populateErrors(payload.errors);
          setStatus(CREATION_STATUSES.ERROR);
          UserStore.emit(USER_CREATION_EVENT);
          break;
        case UserConstants.USER_CREATION_PENDING:
          setStatus(CREATION_STATUSES.PENDING);
          UserStore.emit(USER_CREATION_EVENT)
          break;
      }
    })
  });

})(this);