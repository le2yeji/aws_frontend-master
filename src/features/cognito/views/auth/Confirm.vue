<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="container text-center q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-md">
            <base-card>
              <template v-slot:title>
                <div class="text-h6"><i class="bi bi-person-check me-2"></i>Confirm Account</div>
              </template>
              <template v-slot:body>
                <form @submit.prevent="confirmCode" class="q-gutter-md">
                  <q-input filled v-model.trim="username" label="Username" :dense="true" />
                  <q-input filled type="text" v-model.trim="code" label="Code" :dense="true" />
                  <q-btn label="Confirm Account" type="submit" color="primary" class="full-width q-mt-md" />
                </form>
              </template>
            </base-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { validateConfirmationForm } from '@features/cognito/utils/validator';
import useAlert from '@features/cognito/hooks/alert';
import { POOL_DATA } from '@features/cognito/config/config';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const code = ref('');
    const username = ref(route.query.username);
    const { message, messageStyleType, setMessage } = useAlert();

    async function confirmCode() {
      if (!isValid()) {
        return;
      }

      const userPool = new CognitoUserPool(POOL_DATA);
      const userData = {
        Username: username.value,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      await cognitoUser.confirmRegistration(code.value, true, (err, result) => {
        if (err) {
          setMessage(err.message, 'alert-danger');
          return;
        }

        router.replace({
          name: 'SignIn',
          params: {
            message: 'You have successfully confirmed your account',
          },
        });
      });
    }

    function isValid() {
      const validationData = validateConfirmationForm({
        code: code.value,
        username: username.value,
      });

      if (!validationData.valid) {
        setMessage(validationData.message, 'alert-danger');
        return false;
      }

      return true;
    }

    return {
      confirmCode,
      code,
      username,
      message,
      messageStyleType,
      isValid,
    };
  },
};
</script>

<style></style>