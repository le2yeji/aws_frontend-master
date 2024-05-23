<script setup lang="ts">
import {
  VITE_APP_TITLE,
  MODE,
  VITE_KEYCLOAK_ENABLED,
  VITE_CLUSTER_LIST,
} from '@/config/environment';
const appTitle = ref(VITE_APP_TITLE);
const appMode = ref(MODE);
const clusterOptions = ref(VITE_CLUSTER_LIST.split(','));
const isDrawOpen = ref(false);

import { onMounted, ref, watch } from 'vue';
import { primaryMenus } from '@menus/index';
import { symRoundedMenu } from '@quasar/extras/material-symbols-rounded';

// import DarkToggle from '@/theme/DarkToggle.vue';
// import LogoutIconButton from '@/components/LogoutIconButton.vue';
// import SettingToggle from '@/theme/SettingToggle.vue';
// import FullscreenToogle from '@/components/FullscreenToggle.vue';
// import Footer from '@components/Footer.vue';
import UserProfile from '@components/UserProfile.vue';
import EssentialLink from '@components/EssentialLink.vue';

// yyazi 주석처리함
// import { useAuthStore } from '@features/keycloak/store/useAuthStore';
// const authStore = useAuthStore();
// import { serviceFactory } from '@features/keycloak/services/factory';
// const keycloakService = serviceFactory(VITE_KEYCLOAK_ENABLED, authStore);

import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@store/useLayoutStore';
import DarkToggle from '@/theme/DarkToggle.vue';

const layoutStore = useLayoutStore();
const { menuMini, menuAutoExpand, clusterAlias } = storeToRefs(layoutStore);

//watch(clusterAlias, (newVal) => layoutStore.setClusterAlias(newVal));

// yyazi 주석처리함
// onMounted(() => keycloakService.login());
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered>
      <q-toolbar class="q-px-none">
        <q-btn
          stretch
          flat
          :icon="symRoundedMenu"
          @click="isDrawOpen = !isDrawOpen"
        />
        <!--q-toolbar-title>{{ `${appTitle} (${appMode})` }}</!--q-toolbar-title-->
        <q-toolbar-title>{{ `${appTitle} ( Cloud Native Tech Course 1기 )` }}</q-toolbar-title>
        <!-- <q-btn
          stretch
          flat
          :label="`${appTitle} (${appMode})`"
          class="text-h6"
          :to="{ name: 'overview' }"
        /> -->
        <!--q-select
          filled
          color="primary"
          bg-color="dark"
          v-model="clusterAlias"
          :options="clusterOptions"
        /-->
        <q-space />
        <DarkToggle />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isDrawOpen"
      show-if-above
      :mini="menuMini"
      @mouseover="menuAutoExpand ? (menuMini = false) : ''"
      @mouseout="menuAutoExpand ? (menuMini = true) : ''"
      mini-to-overlay
      :width="250"
      :breakpoint="500"
      bordered
    >
      <q-scroll-area
        class="fit"
        :horizontal-thumb-style="{ opacity: '0' }"
        style="height: calc(100% - 100px)"
      >
        <!-- Menu List -->
        <q-list>
          <EssentialLink
            v-for="link in primaryMenus"
            :key="link.title"
            v-bind="link"
          />

          
        </q-list>

        <!-- User Profile -->
        <UserProfile />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <Footer /> -->
  </q-layout>
</template>
