/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import mutations from '@features/cognito/store/contacts/mutations.js';
import actions from '@features/cognito/store/contacts/actions.js';
import getters from '@features/cognito/store/contacts/getters';

export default {
  state() {
    return {
      contacts: [],
      contact: [],
    };
  },
  mutations,
  actions,
  getters,
};
