import React from 'react';
import Card from '../UI/Card';
import classes from './UserLoginForm.module.css';

const UserLoginForm = (props) => {
  return (
    <Card className={classes.loginCard}>
      <h2 className={classes.loginH2}>Login</h2>
      <form className={classes.userLoginForm} onSubmit={props.onLoginSubmit}>
        <input
          className={classes.userLoginInput}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          className={classes.userLoginInput}
          type="text"
          name="password"
          placeholder="Password"
        />
        <button className={classes.userLoginButton} type="submit">
          Submit
        </button>
      </form>
    </Card>
  );
};

export default UserLoginForm;
