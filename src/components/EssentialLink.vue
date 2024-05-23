<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    default: '#',
  },
  isSeperator: {
    type: Boolean,
    default: false,
  },
});

import { storeToRefs } from 'pinia';
import { useLayoutStore } from '@store/useLayoutStore';
const layoutStore = useLayoutStore();
const { menuMini } = storeToRefs(layoutStore);
</script>

<template>
  <q-item clickable v-ripple :to="to" class="q-py-none">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>

    <q-tooltip
      v-if="menuMini"
      class="bg-grey-10 text-body2"
      anchor="center right"
      self="center start"
    >
      {{ title }}
    </q-tooltip>
  </q-item>

  <q-separator v-if="isSeperator" />
</template>
