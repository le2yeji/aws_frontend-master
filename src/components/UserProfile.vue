<script setup lang="ts">
import { ref } from 'vue';
import { symRoundedSettings } from '@quasar/extras/material-symbols-rounded';

import SettingToggle from '@/theme/SettingToggle.vue';

import { useAuthStore } from '@features/keycloak/store/useAuthStore';
const authStore = useAuthStore();

const mouseOver = ref(false);
</script>

<template>
  <q-item
    class="q-py-none fixed-bottom"
    v-ripple
    clickable
    @mouseover="mouseOver = true"
    @mouseout="mouseOver = false"
  >
    <!-- Setting Menus -->
    <SettingToggle />

    <!-- Last Name -->
    <q-item-section avatar>
      <q-avatar
        v-if="mouseOver"
        size="sm"
        color="primary"
        text-color="white"
        :icon="symRoundedSettings"
      />
      <q-avatar v-else size="sm" color="primary" text-color="white">
        {{ authStore?.user?.family_name?.split('')[0] }}
      </q-avatar>
    </q-item-section>

    <!-- Roles -->
    <q-item-section>
      <q-item-label>{{ authStore?.user?.username }}</q-item-label>
      <q-item-label caption>{{
        authStore?.user?.roles.join(', ')
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
