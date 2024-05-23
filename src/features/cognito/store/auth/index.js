import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { POOL_DATA } from '@features/cognito/config/config';

const state = {
  cognitoUserName: null,
  cognitoSub: null,
  idToken: null,
  session: null,
  refreshToken: null,
  accessToken: null,
  isAuthenticated: false,
  email: null,
  didAutoLogout: false,
};

const mutations = {
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setIDToken(state, payload) {
    state.idToken = payload;
  },
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },
  setUsername(state, payload) {
    state.cognitoUserName = payload;
  },
  logout(state) {
    state.isAuthenticated = false;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setEmail(state, payload) {
    state.email = payload;
  },
  setSession(state, payload) {
    state.session = payload;
  },
};

const actions = {
  setIDToken(context, payload) {
    context.commit('setIDToken', payload);
  },
  setAccessToken(context, payload) {
    context.commit('setAccessToken', payload);
  },
  setUsername(context, payload) {
    context.commit('setUsername', payload);
  },
  setIsAuthenticated(context, payload) {
    context.commit('setIsAuthenticated', payload);
  },
  setEmail(context, payload) {
    context.commit('setEmail', payload);
  },
  setSession(context, payload) {
    context.commit('setSession', payload);
  },
  logout(context) {
    return new Promise((resolve, reject) => {
      console.log('log out called');
      const userPool = new CognitoUserPool(POOL_DATA);
      const cognitoUser = userPool.getCurrentUser();
  
      if (cognitoUser) {
        cognitoUser.signOut();
        localStorage.clear();
        context.commit('logout');
        resolve();
      } else {
        reject('No user is currently logged in.');
      }
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};

const getters = {
  cognitoUserName(state) {
    return state.cognitoUserName;
  },
  cognitoSub(state) {
    return state.cognitoSub;
  },
  idToken(state) {
    return state.idToken;
  },
  session(state) {
    return state.session;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  accessToken(state) {
    return state.accessToken;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  email(state) {
    return state.email;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};