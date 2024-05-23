/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { createStore } from 'vuex';
import authModule from '@features/cognito/store/auth/index';
import settingsModule from '@features/cognito/store/settings/index';
import contactsModule from '@features/cognito/store/contacts/index';

export default createStore({
  state() {
    console.log('🧡store/index.js🧡');

    return {
      isLoading: false,
    };
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    setIsLoading(context, payload) {
      context.commit('setIsLoading', payload);
    },
  },
  modules: {
    authModule,
    settingsModule,
    contactsModule,
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
  },
});
console.log('🧡store/index.js🧡: ', authModule);

