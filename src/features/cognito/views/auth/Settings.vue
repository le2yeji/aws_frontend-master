<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="container text-center q-pa-md">
        <div class="row justify-center">
          <div class="col-12 col-md-6 q-pa-md">
            <base-card>
              <template v-slot:title>
                <div class="text-h6"><i class="bi bi-gear me-1"></i>MFA Settings</div>
              </template>
              <template v-slot:body>
                <div class="row">
                  <div class="col-12 text-start">
                    <div v-if="!showQRCode">
                      <div class="row">
                        <div class="col-4">Enable MFA</div>
                        <div class="col-6">
                          <q-toggle v-model="mfaValue" @change="newQRCode" color="primary" />
                        </div>
                      </div>
                    </div>
                    <div v-if="showQRCode" class="mb-3 text-center">
                      <div>Scan QR Code using Authy, Microsoft Authenticator or Google Authenticator</div>
                      <qrcode-vue :value="qrData" :size="200" level="H"></qrcode-vue>
                    </div>
                    <hr />
                    <div v-if="showQRCode" class="mt-1 text-center">
                      <p>Enter MFA Code</p>
                      <q-input filled type="text" v-model="qrCode" maxlength="6" />
                      <div class="row justify-center q-gutter-md">
                        <q-btn flat label="Cancel" color="negative" @click="cancel" />
                        <q-btn label="Confirm MFA Setup" color="positive" @click="verifyMFA" />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </base-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onBeforeMount, onBeforeUpdate } from 'vue';
import { useStore } from 'vuex';
import QrcodeVue from 'qrcode.vue';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import useAlert from '@features/cognito/hooks/alert';
import { POOL_DATA } from '@features/cognito/config/config';

export default {
  components: {
    QrcodeVue,
  },
  setup() {
    const store = useStore();
    const isEnabled = ref(false);
    const qrData = ref('');
    const showQRCode = ref(false);
    const qrCode = ref('');
    const { message, messageStyleType, setMessage } = useAlert();

    onBeforeMount(function() {
      store.dispatch('fetchMFAValue');
    });

    onBeforeUpdate(function() {
      store.dispatch('fetchMFAValue');
    });

    function newQRCode() {
      if (mfaValue.value === true) {
        setMFA(false);
        setMessage('MFA has successfully been disabled for your account.', 'alert-success');
        return;
      }
      showQRCode.value = true;
      const userPool = new CognitoUserPool(POOL_DATA);
      const cognitoUser = userPool.getCurrentUser();
      cognitoUser.setSignInUserSession(store.getters.session);
      cognitoUser.associateSoftwareToken({
        onSuccess: function(result) {
          console.log(result);
        },
        associateSecretCode: function(secretCode) {
          qrData.value = 'otpauth://totp/CognitoMFA:' + store.getters.email + '?secret=' + secretCode + '&issuer=CognitoJSPOC';
        },
        onFailure: function(err) {
          console.log(err);
          setMessage('There was a problem generating MFA QR Code.', 'alert-danger');
        },
      });
    }

    function verifyMFA() {
      console.log('Assoicating MFA');
      const userPool = new CognitoUserPool(POOL_DATA);
      const cognitoUser = userPool.getCurrentUser();
      cognitoUser.setSignInUserSession(store.getters.session);
      cognitoUser.verifySoftwareToken(qrCode.value, 'SoftwareToken', {
        onSuccess: function(result) {
          console.log(result);
          setMFA(true);
          setMessage('MFA has successfully been setup for your account.', 'alert-success');
          showQRCode.value = false;
        },
        onFailure: function(err) {
          log(err);
          setMessage(
            err.message || 'There was a problem confirming MFA Code.', 'alert-danger');
        },
      });
    }

    function setMFA(isEnabled) {
      const userPool = new CognitoUserPool(POOL_DATA);
      const cognitoUser = userPool.getCurrentUser();
      cognitoUser.setSignInUserSession(store.getters.session);

      const totpMfaSettings = {
        PreferredMfa: isEnabled,
        Enabled: isEnabled,
      };

      cognitoUser.setUserMfaPreference(null, totpMfaSettings, function(err, result) {
        if (err) {
          console.log(err);
        }

        store.dispatch('setMFA', isEnabled);
        console.log('setUserMfaPreference call result ' + result);
      });
    }

    const mfaValue = computed(() => {
      console.log(`MFA enabled - ${store.getters.isMFAEnabled}`);
      return store.getters.isMFAEnabled;
    });

    function cancel() {
      showQRCode.value = false;
      setMessage('MFA setup cancelled', 'alert-success');
    }

    return {
      isEnabled,
      setMFA,
      mfaValue,
      qrData,
      newQRCode,
      showQRCode,
      qrCode,
      verifyMFA,
      cancel,
      message,
      messageStyleType,
      setMessage,
    };
  },
};
</script>

<style></style>