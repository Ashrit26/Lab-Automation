import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SignUpLink } from './Signup';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const Signin = ({ history }) =>
  <div>
    
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
	<div className="login">
	<div className="login-screen w3-center">
				<div className="app-title">
				<h1 style={{color: "#ff3d00"}}>SignIn</h1>
			</div>
	<div className="login-form">
      <form onSubmit={this.onSubmit}>
	<div className="control-group">
        <input
          value={email}
	  className="login-field"
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
	<label className="login-field-icon fui-user"></label>
	</div>
	<div className="control-group">
        <input
          value={password}
	  className="login-field"
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
	<label className="login-field-icon fui-user"></label>
	</div>
        <button className="btn btn-primary btn-large btn-block" disabled={isInvalid} type="submit">
          Sign In
        </button>
	  <p>
    Don't have an account?
    {' '}
    <Link to='/signup'>Sign Up</Link>
  </p>

        { error && <p>{error.message}</p> }
      </form>
			</div>
		</div>
	</div>
    );
  }
}

export default withRouter(Signin);

export {
  SignInForm,
};
