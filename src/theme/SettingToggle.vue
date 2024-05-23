<script setup lang="ts">
import { useQuasar } from 'quasar';
import {
  symRoundedLogout,
  symRoundedSettings,
} from '@quasar/extras/material-symbols-rounded';

const $q = useQuasar();
// const isDarkMode = JSON.parse(localStorage.getItem('dark-mode') || '{}');

// $q.dark.set(isDarkMode === '' ? 'auto' : isDarkMode); // or false or "auto"

import { onMounted, ref, watch } from 'vue';

import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@store/useLayoutStore';
const layoutStore = useLayoutStore();
const { menuMini, menuAutoExpand, darkMode } = storeToRefs(layoutStore);

const updateToggleMini = (value: boolean) => {
  localStorage.setItem('menu-mini', JSON.stringify(value));
};

const updateToggleExpand = (value: boolean) => {
  localStorage.setItem('menu-auto-expand', JSON.stringify(value));
};

const isDarkMode = ref(darkMode);
// console.log('isDarkMode', isDarkMode.value);

watch(
  () => isDarkMode.value,
  (val) => {
    console.log('watch dark', val);
    $q.dark.set(val === null ? 'auto' : val);
    localStorage.setItem(
      'dark-mode',
      JSON.stringify(val === null ? 'auto' : val),
    );
  },
);

// yyazi keycloak > cognito로 변경 --start
// onMounted(() => {
//   $q.dark.set(JSON.parse(localStorage.getItem('dark-mode') || ''));
// });

onMounted(() => {
  const darkModeSetting = localStorage.getItem('dark-mode');
  try {
    $q.dark.set(JSON.parse(darkModeSetting));
  } catch (e) {
    console.error('Failed to parse dark-mode setting:', e);
    $q.dark.set(JSON.parse(darkModeSetting)); // 기본값으로 설정
  }
});

// yyazi keycloak > cognito로 변경
// import { useAuthStore } from '@features/keycloak/store/useAuthStore';
// 로그아웃 실행
// store.dispatch('authModule/logout');
// const router = useRouter();
// yyazi keycloak > cognito로 변경을 위해 주석처리
// const keycloakService = serviceFactory(
//   import.meta.env.VITE_KEYCLOAK_ENABLED,
//   authStore,
// );
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  const router = useRouter();
  const store = useStore();

  const isAuthenticated = computed(() => store.getters.isAuthenticated);

  async function logout() {
    await store.dispatch('logout');
    router.push({ name: 'SignIn', params: { message: 'You have logged out' } });
  }

  defineExpose({
    logout,
    isAuthenticated
  });
</script>

<template>
  <q-menu stretch flat :icon="symRoundedSettings">
    <div style="max-width: 360px; min-width: 249px">
      <q-list padding>
        <!-- <q-item-label header>다크 모드 설정</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>
              {{
                isDarkMode === null
                  ? '시스템 모드'
                  : isDarkMode === true
                    ? '다크 모드'
                    : '라이트 모드'
              }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="blue"
              keep-color
              toggle-indeterminate
              :indeterminate-icon="symRoundedSettingsNightSight"
              v-model="isDarkMode"
              :icon="
                $q.dark.isActive ? symRoundedDarkMode : symRoundedLightMode
              "
            />
          </q-item-section>
        </q-item>

        <q-separator spaced /> -->

        <q-item-label header>메뉴 설정</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>아이콘 메뉴</q-item-label>
            <q-item-label caption>좌측 메뉴 최소화 On/Off</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle
              color="green"
              keep-color
              v-model="menuMini"
              @update:model-value="updateToggleMini"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>메뉴 자동 확장</q-item-label>
            <q-item-label caption>좌측 메뉴 자동 확장 On/Off</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle
              color="red"
              keep-color
              v-model="menuAutoExpand"
              @update:model-value="updateToggleExpand"
            />
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item-label header>시스템</q-item-label>
        
        <!-- yyazi keycloak > cognito로 변경 -->
        <q-item tag="label" v-ripple @click.prevent="logout()">
          <q-item-section>
            <q-item-label>로그아웃</q-item-label>
            <q-item-label caption>시스템을 종료합니다</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="symRoundedLogout" color="grey" class="q-pr-sm" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-menu>
</template>
