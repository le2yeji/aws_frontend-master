<script setup lang="ts">
import { useQuasar } from 'quasar';
import { watch } from 'vue';
import {
  symRoundedDarkMode,
  symRoundedLightMode,
} from '@quasar/extras/material-symbols-rounded';

const $q = useQuasar();
const isDarkMode = JSON.parse(localStorage.getItem('dark-mode') || '{}');

// set status
$q.dark.set(isDarkMode === '' ? 'auto' : isDarkMode); // or false or "auto"

watch(
  () => $q.dark.isActive,
  (val) => {
    // console.log(val ? 'On dark mode' : 'On light mode')
    localStorage.setItem('dark-mode', JSON.stringify(val));
    //localStorage.setItem('light-mode', JSON.stringify(val));
  },
);

const toggleTheme = () => $q.dark.toggle();
</script>

<template>
  <q-btn
    stretch
    flat
    :icon="$q.dark.isActive ? symRoundedDarkMode : symRoundedLightMode"
    @click="toggleTheme"
  />
</template>
