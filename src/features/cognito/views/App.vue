<!-- 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0  
-->
<template>
  <div>
    <site-nav></site-nav>

    <router-view />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import SiteNav from '@features/cognito/components/layout/SiteNav';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { POOL_DATA } from '@features/cognito/config/config';

export default {
  components: {
    SiteNav,
  },
  setup() {
    const store = useStore();

    // gets reference to the Cognito user pool
    const userPool = new CognitoUserPool(POOL_DATA);

    //gets current logged in user
    const cognitoUser = userPool.getCurrentUser();
    console.log('🧡cognito/app.vue🧡cognitoUser:', cognitoUser);

    // logic to check if users session is still valid
    if (cognitoUser) {
      console.log(cognitoUser);
      cognitoUser.getSession(function(err, session) {
        if (err) {
          console.log('🧡cognito/app.vue🧡Session error:', err.message || JSON.stringify(err));
          return;
        }
        console.log('🧡cognito/app.vue🧡Session data:', session);

        store.dispatch("setIDToken", session.idToken.jwtToken);
        console.log('🧡cognito/app.vue🧡Session idToken:', store.state.auth.idToken);
        store.dispatch("setAccessToken", session.accessToken.jwtToken);
        console.log('🧡cognito/app.vue🧡Session accessToken:', store.state.auth.accessToken);
        store.dispatch("setEmail", session.idToken.payload.email);
        console.log('🧡cognito/app.vue🧡Session email:', store.state.auth.email);
        store.dispatch("setSession", session);
        store.dispatch(
          "setUsername",
          session.idToken.payload["cognito:username"]
        );
        store.dispatch("setIsAuthenticated", true);

        console.log('🧡cognito/app.vue🧡Session is valid:', session.isValid());
      });
    } else {
      store.dispatch("setIsAuthenticated", false);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
