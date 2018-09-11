import React, { Component } from 'react';
import { Link,
  withRouter, } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import color from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';




const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  branch: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
	    const {
      username,
      email,
      branch,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
	if(email === "perumaalnitk@nitk.edu.in")
		{history.push(routes.HOMEHOD);}
	else if(email === "tricalta@nitk.edu.in")
        	{history.push(routes.HOMETA);}
	else
		{history.push(routes.HOMESTUDENT);}
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      branch,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

	    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      branch === '' ||
      email === '' ||
      username === '';
    return (
	<div className="login">
	<div className="login-screen">
				<div style={{textAlign: "center"}}>	
        			<h1 style={{color: "#ff1744"}}>SignUp</h1>

			</div>
	<div className="login-form">
      <form onSubmit={this.onSubmit}>
	<div className="control-group">
	        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        /><label className="login-field-icon fui-user"></label>
</div>
<div className="control-group">
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        /><label className="login-field-icon fui-user"></label>
</div>
<div className="control-group">
        <input
        value={branch}
        onChange={event => this.setState(byPropKey('branch', event.target.value))}
        type="text"
        placeholder="Branch"
        /><label className="login-field-icon fui-user"></label>
</div>       
<div className="control-group">
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        /><label className="login-field-icon fui-user"></label>
</div>
<div className="control-group">
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        /><label className="login-field-icon fui-user"></label>
</div>
        <button className="btn btn-primary btn-large btn-block" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }	
      </form></div></div></div>
    );
  }
}



export default withRouter(SignUpPage);

export {
  SignUpForm,
};
