import React from 'react';
import Card from '../UI/Card';
import classes from './UserSignUpForm.module.css';

const UserSignUpForm = (props) => {
  return (
    <Card className={classes.signUpCard}>
      <form className={classes.userSignUpForm} onSubmit={props.onSignUpSubmit}>
        <input
          className={classes.userSignUpInput}
          type="text"
          placeholder="Choose Username"
        />
        <input
          className={classes.userSignUpInput}
          type="text"
          placeholder="Choose Password"
        />
        <input
          className={classes.userSignUpInput}
          type="text"
          placeholder="Confirm Password"
        />
        <button className={classes.userSignUpButton} type="submit">
          Register
        </button>
      </form>
    </Card>
  );
};

export default UserSignUpForm;
