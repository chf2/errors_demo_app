ApiUtil = {
  createUser: function (user) {
    $.ajax({
      type: "POST",
      url: "/api/app_academy_students",
      dataType: 'json',
      data: { app_academy_student: user },
      success: function (user) {
        UserActions.creationSuccess(user);
      },
      error: function (errors) {
        UserActions.creationError(JSON.parse(errors.responseText));
      }
    })
  }
};