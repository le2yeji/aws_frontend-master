<script setup lang="ts">
import { useQuasar } from 'quasar';
import { watch } from 'vue';
import {
  symRoundedFullscreen,
  symRoundedFullscreenExit,
} from '@quasar/extras/material-symbols-rounded';

const $q = useQuasar();
const isFullscreen = JSON.parse(localStorage.getItem('fullscreen') || 'false');

// 컴포넌트 마운트 시 Local storage의 'fullscreen' 값을 확인하여 true 면 fullscreen 모드로 바로 시작!
if (isFullscreen) {
  $q.fullscreen
    .request()
    .then(() => {
      // success
      console.log('success!');
    })
    .catch(() => {
      console.log('oh, no!!!');
    });
}

// set status
// $q.fullscreen.set(isFullscreen === '' ? 'auto' : isFullscreen); // or false or "auto"

watch(
  () => $q.fullscreen.isActive,
  (val) => {
    console.log(val ? 'In Fullscreen Now' : 'Exited Fullscreen');
    localStorage.setItem('fullscreen', JSON.stringify(val));
  },
);

const toggleFullScreen = () => $q.fullscreen.toggle();
</script>

<template>
  <q-btn
    stretch
    flat
    color="white"
    :icon="
      $q.fullscreen.isActive ? symRoundedFullscreenExit : symRoundedFullscreen
    "
    @click="toggleFullScreen"
    v-if="$q.screen.gt.sm"
  >
  </q-btn>
</template>
