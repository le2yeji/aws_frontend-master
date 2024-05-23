/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import mutations from '@features/cognito/store/settings/mutations.js';
import actions from '@features/cognito/store/settings/actions.js';
import getters from '@features/cognito/store/settings/getters';

export default {
  state() {
    return {
      isMFAEnabled: false,
    };
  },
  mutations,
  actions,
  getters,
};
