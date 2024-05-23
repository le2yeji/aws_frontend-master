<template>
  <q-card flat bordered square class="q-pa-sm bg-grey-10 full-height">
    <q-card-section class="q-pa-none q-mb-md q-mt-none">
      <div class="text-subtitle2 row no-wrap items-center">
        <q-icon
          :name="symRoundedDatabase"
          class="q-mr-sm text-grey-6"
          size="xs"
        />
        Database Instances
      </div>
    </q-card-section>

    <div class="col-grow row no-wrap">
      <div class="col row wrap q-gutter-sm">
        <div
          v-for="(item, index) in dbInfo"
          :key="index"
          :class="
            item.status === 'warning'
              ? 'bg-warning'
              : item.status === 'error'
                ? 'bg-negative'
                : 'bg-primary'
          "
          style="width: 2rem; height: 2rem"
        ></div>
      </div>
      <div
        class="no-margin no-padding q-pa-sm col-3 text-h3 text-end row justify-center content-center"
      >
        {{ tweened.number.toFixed(0) }}
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import gsap from 'gsap';
import { symRoundedDatabase } from '@quasar/extras/material-symbols-rounded';

const number = ref(0);
const tweened = reactive({
  number: 0,
});

watch(number, (n) => {
  gsap.to(tweened, { duration: 0.3, number: Number(n) || 0 });
});

onMounted(() => {
  setTimeout(() => {
    number.value = 42;
  }, 500);
});

const dbInfo = ref([
  { name: 'db-1', status: 'active' },
  { name: 'db-2', status: 'active' },
  { name: 'db-3', status: 'active' },
  { name: 'db-4', status: 'active' },
  { name: 'db-5', status: 'active' },
  { name: 'db-6', status: 'active' },
  { name: 'db-7', status: 'active' },
  { name: 'db-8', status: 'active' },
  { name: 'db-9', status: 'active' },
  { name: 'db-10', status: 'active' },
  { name: 'db-11', status: 'active' },
  { name: 'db-12', status: 'warning' },
  { name: 'db-13', status: 'active' },
  { name: 'db-14', status: 'active' },
  { name: 'db-15', status: 'active' },
  { name: 'db-16', status: 'active' },
  { name: 'db-17', status: 'active' },
  { name: 'db-18', status: 'active' },
  { name: 'db-19', status: 'active' },
  { name: 'db-20', status: 'error' },
  { name: 'db-21', status: 'active' },
  { name: 'db-22', status: 'active' },
  { name: 'db-23', status: 'active' },
  { name: 'db-24', status: 'active' },
  { name: 'db-25', status: 'active' },
  { name: 'db-26', status: 'warning' },
  { name: 'db-27', status: 'active' },
  { name: 'db-28', status: 'active' },
  { name: 'db-29', status: 'active' },
  { name: 'db-30', status: 'active' },
  { name: 'db-31', status: 'active' },
  { name: 'db-32', status: 'active' },
  { name: 'db-33', status: 'active' },
  { name: 'db-34', status: 'active' },
  { name: 'db-35', status: 'active' },
  { name: 'db-36', status: 'warning' },
  { name: 'db-37', status: 'active' },
  { name: 'db-38', status: 'active' },
  { name: 'db-39', status: 'active' },
  { name: 'db-40', status: 'active' },
  { name: 'db-41', status: 'active' },
  { name: 'db-42', status: 'active' },
]);
</script>
