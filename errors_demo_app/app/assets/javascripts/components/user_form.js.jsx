UserForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  statuses: {
    none: 'none',
    success: 'success',
    error: 'error',
    pending: 'pending'
  },

  _creationEventHandler: function (eventType, payload) {
    switch (eventType) {
      case UserConstants.USER_CREATION_SUCCESS:
        this.setState({ status: this.statuses.success });
        break;
      case UserConstants.USER_CREATION_ERROR:
        this.setState({
          status: this.statuses.error,
          errors: payload 
        });
        break;
      case UserConstants.USER_CREATION_PENDING:
        this.setState({ status: this.statuses.pending });
        break;
      default: 
        this.setState({ status: this.statuses.none });
    }
  },
  
  getInitialState: function () {
    return ({
      first_name: '',
      last_name: '',
      age: '',
      city: 'San Francisco',
      love_for_javascript: '2',
      favorite_ta: 'Eric',
      status: this.statuses.none,
      errors: []
    });
  },

  componentDidMount: function () {
    UserStore.addUserCreationListener(this._creationEventHandler);
  },

  componentWillUnmount: function () {
    UserStore.removeUserCreationListener(this._creationEventHandler);
  },

  submitUserForm: function (e) {
    e.preventDefault();
    UserActions.createUser(this.state);
  },

  updateCity: function (e) {
    this.setState({ city: e.target.value });
  },

  updateTa: function (e) {
    this.setState({ favorite_ta: e.target.value });
  },

  render: function () {
    var errors = "", disabled = "", note = "", selected;

    if (this.state.status === this.statuses.pending) {
      note = "Creating new user..."
      disabled = "disabled";
    } else if (this.state.status === this.statuses.error) {
      note = "There were problems with your form submission. \n Please review and resubmit.";
      errors = 
        <ul>
          {
            this.state.errors.map(function(error, i) {
              return <li key={i}>{error}</li>
            })
          }
        </ul>;
    } else if (this.state.status === this.statuses.success) {
      note = "User successfully created!";
      disabled = true;
    }

    return(
      <div>
        <h1>Create an App Academy Student</h1>
        {errors}
        <form onSubmit={this.submitUserForm}>
          <label htmlFor="user-first-name">First Name: </label>
          <input type="text" id="user-first-name" valueLink={this.linkState('first_name')} disabled={disabled} />
          <br></br>
          <label htmlFor="user-last-name">Last Name: </label>
          <input type="text" id="user-last-name" valueLink={this.linkState('last_name')} disabled={disabled} />
          <br></br>
          <label htmlFor="user-age">Age: </label>
          <input type="number" id="user-age" valueLink={this.linkState('age')} disabled={disabled} />
          <br></br>
          <label htmlFor="user-love-for-javascript">Love For Javascript: </label>
          <input type="number" id="user-love-for-javascript" valueLink={this.linkState('love_for_javascript')} disabled={disabled} />
          <br></br>
          <label htmlFor="user-city">City: </label>
          <select id="user-city" onChange={this.updateCity} value={this.state.city} disabled={disabled}>
            {
              ['New York', 'San Francisco', 'Chicago'].map(function(city) {
                return <option key={city}>{city}</option>
              }.bind(this))
            }
          </select>
          <br></br>
          <label htmlFor="user-favorite-ta">Favorite TA: </label>
          <select id="user-favorite-ta" onChange={this.updateTa} value={this.state.favorite_ta} disabled={disabled}>
            {
              ['Eric', 'Charles', 'Judy'].map(function(name) {
                return <option key={name}>{name}</option>
              }.bind(this))
            }
          </select>
          <br></br>
          <input type="submit" value="Create User" disabled={disabled}></input>
        </form>
        <h3>{note}</h3>
    </div>
    )
  }
})