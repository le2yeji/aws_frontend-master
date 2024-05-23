<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="container text-center q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-md">
            <base-card>
              <template v-slot:title>
                <div class="text-h6"><i class="bi bi-person-fill me-2"></i>Sign In</div>
              </template>
              <template v-slot:body>
                <form @submit.prevent="signIn" class="q-gutter-md">
                  <q-input filled v-model.trim="username" label="Username" :dense="true" />
                  <q-input filled type="password" v-model.trim="password" label="Password" :dense="true" />
                  <div v-if="confirmMFACode" class="q-mt-md">
                    <q-input filled type="password" v-model.trim="mfaCode" label="MFA Code" :dense="true" />
                  </div>
                  <q-btn label="Sign In" type="submit" color="primary" class="full-width q-mt-md" />
                </form>
              </template>
            </base-card>
            <div class="row q-mt-md justify-center">
              <q-btn flat @click="$router.push('/forgotpassword')" label="Forgot Password?" />
              <q-btn flat @click="$router.push('/signup')" label="Sign Up" />
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { validateSignInForm } from '@features/cognito/utils/validator';
import useAlert from '@features/cognito/hooks/alert';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { POOL_DATA } from '@features/cognito/config/config';

export default {
  name: 'SignIn',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const username = ref('');
    const password = ref('');
    const mfaCode = ref('');
    const { message, messageStyleType, setMessage } = useAlert();
    const confirmMFACode = ref(false);

    function signIn() {
      if (!isValid()) {
        return;
      }
      const userPool = new CognitoUserPool(POOL_DATA);
      const authData = {
        Username: username.value,
        Password: password.value,
      };
      const authDetails = new AuthenticationDetails(authData);
      const userData = {
        Username: authData.Username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess(session) {
          console.log('🧡cognito/signinForm.vue🧡onSuccess',session);
          setUserSessionInfo(session);
          router.replace({
            name: 'PrimaryLayout',
            query: { message: 'You have successfully signed in' }
          });
        },
        onFailure(error) {
          setMessage(error.message, 'alert-danger');
        },
        totpRequired(codeDeliveryDetails) {
          confirmMFACode.value = true;
          cognitoUser.sendMFACode(mfaCode.value, this, codeDeliveryDetails);
        },
      });
    }

    function setUserSessionInfo(session) {
      setTimeout(function() {
        store.dispatch('autoLogout');
        router.replace('/signin');
        alert('You have been automatically logged out');
      }, autoTimeout(session));

      store.dispatch('setSession', session);
      store.dispatch('setIDToken', session.getIdToken().getJwtToken());
      store.dispatch('setUsername', session.idToken.payload['cognito:username']);
      store.dispatch('setIsAuthenticated', true);
      store.dispatch('setEmail', session.idToken.payload.email);
    }

    onMounted(function() {
      if (route.params.message) {
        message.value = route.params.message;
      }
    });

    function isValid() {
      const validationData = validateSignInForm({
        username: username.value,
        password: password.value,
      });
      if (!validationData.valid) {
        setMessage(        validationData.message, 'alert-danger');
        return false;
      }
      return true;
    }

    function autoTimeout(session) {
      const seconds_timeout = 3600;
      const expirationDate = +session.idToken.payload['auth_time'] + seconds_timeout;
      return (expirationDate - +session.idToken.payload['auth_time']) * 1000;
    }

    return {
      username,
      password,
      signIn,
      message,
      messageStyleType,
      mfaCode,
      confirmMFACode,
      setUserSessionInfo,
    };
  },
};
</script>

<style></style>