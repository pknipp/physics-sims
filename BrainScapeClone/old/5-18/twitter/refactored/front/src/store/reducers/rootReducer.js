import { combineReducers } from 'redux';
import tweetsReducer from './tweetsReducer';
import usersReducer from './usersReducer';
import authReducer from '../authentication';

export default combineReducers({ tweets: tweetsReducer, users: usersReducer, auth: authReducer });
