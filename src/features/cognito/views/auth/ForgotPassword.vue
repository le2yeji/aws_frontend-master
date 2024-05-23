<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="container text-center q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-md">
            <base-card>
              <template v-slot:title>
                <div class="text-h6"><i class="bi bi-question-circle me-2"></i>Forgot Password</div>
              </template>
              <template v-slot:body>
                <form @submit.prevent="sendCode" v-show="!confirmCode" class="q-gutter-md">
                  <q-input filled v-model.trim="username" label="Username" :dense="true" />
                  <q-btn label="Send Password Reset Code" type="submit" color="primary" class="full-width q-mt-md" />
                </form>
                <form @submit.prevent="resetPassword" v-show="confirmCode" class="q-gutter-md">
                  <q-input filled v-model.trim="code" label="Confirm Code" :dense="true" />
                  <q-input filled type="password" v-model.trim="password" label="New Password" :dense="true" />
                  <q-input filled type="password" v-model.trim="confirmPassword" label="Confirm Password" :dense="true" />
                  <q-btn label="Change Password" type="submit" color="primary" class="full-width q-mt-md" />
                </form>
              </template>
            </base-card>
            <div class="row q-mt-md justify-center">
              <q-btn flat @click="$router.push('/signin')" label="Sign In" />
              <q-btn flat @click="$router.push('/signup')" label="Sign Up" />
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import {
  validateResetPasswordForm,
  validateForgotPasswordForm,
} from '@features/cognito/utils/validator';
import useAlert from '@features/cognito/hooks/alert';
import { useRouter } from 'vue-router';
import { POOL_DATA } from '@features/cognito/config/config';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const code = ref('');
    const confirmCode = ref(false);
    const { message, messageStyleType, setMessage } = useAlert();

    function sendCode() {
      const validationData = validateForgotPasswordForm({
        username: username.value,
      });

      if (!validationData.valid) {
        message.value = validationData.message;
        messageStyleType.value = 'alert-danger';
        return;
      }

      const userPool = new CognitoUserPool(POOL_DATA);
      const userData = {
        Username: username.value,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.forgotPassword({
        onSuccess: function(data) {
          console.log(data);
          confirmCode.value = true;
        },
        onFailure: function(err) {
          setMessage(err.message, 'alert-danger');
        },
      });
    }

    function resetPassword() {
      if (!isValid()) {
        return;
      }

      const userPool = new CognitoUserPool(POOL_DATA);
      const userData = {
        Username: username.value,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmPassword(code.value, password.value, {
        onSuccess() {
          router.replace({
            name: 'SignIn',
            params: {
              message: 'You have successfully reset your password',
            },
          });
        },
        onFailure(err) {
          setMessage(err.message, 'alert-danger');
        },
      });
    }

    function isValid() {
      const validationData = validateResetPasswordForm({
        code: code.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      if (!validationData.valid) {
        setMessage(validationData.message, 'alert-danger');
        return false;
      }

      return true;
    }

    return {
      username,
      code,
      confirmPassword,
      sendCode,
      resetPassword,
      password,
      confirmCode,
      message,
      messageStyleType,
    };
  },
};
</script>

<style></style>