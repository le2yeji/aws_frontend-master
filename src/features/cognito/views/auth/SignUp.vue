<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="container text-center q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-md">
            <base-card>
              <template v-slot:title>
                <div class="text-h6"><i class="bi bi-person-plus me-2"></i>Sign Up</div>
              </template>
              <template v-slot:body>
                <form @submit.prevent="signUp" class="q-gutter-md">
                  <q-input filled v-model.trim="username" label="Username" :dense="true" />
                  <q-input filled type="email" v-model.trim="email" label="Email" :dense="true" placeholder="email@example.com" />
                  <q-input filled type="password" v-model.trim="password" label="Password" :dense="true" />
                  <q-input filled type="password" v-model.trim="confirmPassword" label="Confirm Password" :dense="true" />
                  <q-btn label="Sign Up" type="submit" color="primary" class="full-width q-mt-md" />
                </form>
              </template>
            </base-card>
            <div class="row q-mt-md justify-center">
              <q-btn flat @click="navigateTo('/signin')" label="Already have an account? Sign In" />
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateSignUpForm } from '@features/cognito/utils/validator';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { POOL_DATA } from '@features/cognito/config/config';

export default {
  name: 'SignUp',
  setup() {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    async function signUp() {
      if (!isValid()) return;

      const userPool = new CognitoUserPool(POOL_DATA);
      const emailAttribute = new CognitoUserAttribute({ Name: 'email', Value: email.value });
      const attrList = [emailAttribute];

      userPool.signUp(username.value, password.value, attrList, null, (err, result) => {
        if (err) {
          alert(err.message);
          return;
        }
        router.replace({ name: 'Confirm', query: { username: username.value } });
      });
    }

    function isValid() {
      const { valid, message } = validateSignUpForm({ username: username.value, password: password.value, confirmPassword: confirmPassword.value, email: email.value });
      if (!valid) {
        alert(message);
        return false;
      }
      return true;
    }

    function navigateTo(path) {
      router.push(path);
    }

    return {
      username,
      email,
      password,
      confirmPassword,
      signUp,
      navigateTo,
    };
  },
};
</script>

<style></style>