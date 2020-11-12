import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'

import NavBar from './components/NavBar';

import Login from './components/Login';
import SignUp from './components/SignUp';

import Success from './Success';


// The following are not yet being used:
//import { Component } from "react";
//import Tweets from './components/tweets/ConnectedTweets';
//import TweetShow from './components/tweet-show/ConnectedTweetShow';
//import NewTweet from './components/NewTweet';

const ProtectedRoute = ({component: Component, loggedIn, ...rest}) => {
  return (loggedIn) ? <Route {...rest} component={Component}/> : <Redirect to="/login" />;
};

const mapStateToProps = state => ({loggedIn: !!state.auth.id});

const ConnectedProtectedRoute = connect(mapStateToProps, null)(ProtectedRoute);

function App() {
  return (
    <>
      <NavBar />
      <main>
        {/*<NewTweet />*/}
        <Switch>
          <ConnectedProtectedRoute exact path="/" component={Success /* Tweets */} />
          {/*<Route exact path="/tweets/:id" component={TweetShow} />*/}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </main>
    </>
  );
}

export default App;
