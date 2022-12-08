import React, { useState } from 'react';
import Navbar from './UI/Navbar';
import UserLoginForm from './login-components/UserLoginForm';
import AddPortfolioContainer from './addPorfolio-components/AddPortfolioContainer';
import classes from './App.module.css';
import MyPortfolioContainer from './myPortfolio-components/MyPortfolioContainer';
import UserSignUpForm from './signup-component/UserSignUpForm';

const App = () => {
  //States for what part of the app is the user in/seeing
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [isInMyPortfolio, setIsInMyPortfolio] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  // active user state
  const [analytics, setAnalytics] = useState([]);
  const [newPortfolio, setNewPortfolio] = useState([]);

  //navbar state
  const [navState, setNavState] = useState({
    loginBtn: true,
    signUpBtn: true,
    logoutBtn: false,
    myPortfolioBtn: false,
    addPortfolioBtn: false,
  });

  const loginHandler = () => {
    if (isSigningUp) setIsSigningUp(false);
    if (isLoggingIn) setIsLoggingIn(false);
    else setIsLoggingIn(true);
  };

  const signUpHandler = () => {
    if (isLoggingIn) setIsLoggingIn(false);
    if (isSigningUp) setIsSigningUp(false);
    else setIsSigningUp(true);
  };

  const logOutHandler = () => {
    setAnalytics([]);
    setIsAddingPortfolio(false);
    setIsInMyPortfolio(false);
    setNavState({
      ...navState,
      myPortfolioBtn: false,
      addPortfolioBtn: false,
      loginBtn: true,
      signUpBtn: true,
      logoutBtn: false,
    });
  };

  const switchToAddPortfolioHandler = () => {
    //check if user is logged in/in active session
    //check if user is in MyPortfolio, if yes set it to false
    if (isInMyPortfolio) setIsInMyPortfolio(false);
    setNavState({ ...navState, myPortfolioBtn: true, addPortfolioBtn: false });
    setIsAddingPortfolio(true);
  };

  const switchToMyPortfolioHandler = () => {
    if (isAddingPortfolio) setIsAddingPortfolio(false);
    setNavState({ ...navState, myPortfolioBtn: false, addPortfolioBtn: true });
    if (isLoggingIn) setIsLoggingIn(false);
    setIsInMyPortfolio(true);
  };

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        setActiveUser(username);
        setNavState({
          ...navState,
          loginBtn: false,
          signUpBtn: false,
          logoutBtn: true,
          addPortfolioBtn: true,
        });
        //check if result is valid, if not we need to tell the user that his login was invalid
        if (result) {
          setAnalytics(result);
          setIsLoggingIn(false);
          setIsInMyPortfolio(true);
        } else {
          console.log('invalid login credentials');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignUpSubmitHandler = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    const password2 = e.target[2].value;

    //check for equivalent passwords
    if (password !== password2) {
      alert('passwords do not match');
      return;
    }

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        setActiveUser(username);
        setNavState({
          ...navState,
          loginBtn: false,
          signUpBtn: false,
          logoutBtn: true,
          addPortfolioBtn: true,
        });
        //check if result is valid, if not we need to tell the user that his login was invalid
        if (result) {
          setAnalytics(result);
          setIsSigningUp(false);
          setIsAddingPortfolio(true);
        } else {
          setIsSigningUp(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateNewPortfolioHandler = (e) => {
    e.preventDefault();
    const ticker = e.target[0].value;
    const marketValue = e.target[1].value;
    if (ticker && marketValue) {
      const newEntry = { ticker, marketValue };
      setNewPortfolio([...newPortfolio, newEntry]);
    }
  };

  const onSubmitCreatedPortfolioHandler = (e) => {
    e.preventDefault();
    if (newPortfolio.length === 0) {
      console.log('you have not added any entries');
      return;
    }
    fetch('http://localhost:3000/update', {
      method: 'PATCH',
      body: JSON.stringify({
        username: activeUser,
        newPortfolio: newPortfolio,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        //check if result is valid, if not we need to tell the user that his login was invalid
        if (result) {
          // setIsInMyPortfolio(true);
        } else {
          console.log('attempt to update portfolio failed');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.app}>
      <Navbar
        onLoginClick={loginHandler}
        onSignUpClick={signUpHandler}
        onAddPortfolioClick={switchToAddPortfolioHandler}
        onMyPortfolioClick={switchToMyPortfolioHandler}
        onLogOutClick={logOutHandler}
        navState={navState}
      />
      {isLoggingIn && <UserLoginForm onLoginSubmit={onLoginSubmitHandler} />}
      {isSigningUp && <UserSignUpForm onSignUpSubmit={onSignUpSubmitHandler} />}
      {isAddingPortfolio && (
        <AddPortfolioContainer
          update={updateNewPortfolioHandler}
          newPortfolio={newPortfolio}
          onSubmitPortfolio={onSubmitCreatedPortfolioHandler}
        />
      )}
      {isInMyPortfolio && <MyPortfolioContainer analytics={analytics} />}
    </div>
  );
};

export default App;
