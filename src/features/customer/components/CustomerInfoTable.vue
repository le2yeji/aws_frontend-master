<template>
  <q-card flat square bordered class="q-pa-sm">
    <q-card-section class="q-pa-none q-mb-md q-mt-none">
      <div class="text-subtitle2 row no-wrap items-center">
        <q-icon
          :name="symRoundedDatabase"
          class="q-mr-sm text-grey-6"
          size="xs"
        />
        고객정보
      </div>
    </q-card-section>

    <q-table
      flat
      dense
      square
      :rows="customerStatus"
      :rows-per-page-options="[4]"
      :columns="columns"
      row-key="custId"
      no-data-label="I didn't find anything for you"

      :pagination="initialPagination"
    >
      <!--template-- v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-grey-6"
          >
            {{ col.label }}
            <q-tooltip
              v-if="col.label === '세션 상태'"
              anchor="top middle"
              self="center middle"
            >
              Total / Ready / Running
            </q-tooltip>
          </q-th>
        </q-tr>
      </!--template-->

      <template v-slot:body-cell-sessionUsage="props">
        <q-td :props="props">
          <div class="row no-wrap items-center q-gutter-sm">
            <q-linear-progress
              stripe
              :value="props.value"
              size="xl"
              :color="progressColorChanger(props.value)"
            />
            <span :class="textColorChanger(props.value)">
              {{ props.value * 100 }}%
            </span>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script setup lang="ts">

import { symRoundedDatabase } from '@quasar/extras/material-symbols-rounded';
import { QTableColumn } from 'quasar';
import { onMounted, onUnmounted, ref } from 'vue';

import useCustomerStatus from '../composables/useCustomerStatus';
  const { customerStatus, getCustomerStatus } = useCustomerStatus();


const initialPagination = {
  sortBy: 'custId',
  descending: false,
  page: 1,
  rowsPerPage: 20,
  // rowsNumber: xx if getting data from a server
};


const isLoadingSkeleton = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoadingSkeleton.value = false;
  }, 1000 * 60); // 60초 후
});

const progressColorChanger = (value: number) =>
  value > 0.8 ? 'negative' : value > 0.6 ? 'warning' : 'primary';

const textColorChanger = (value: number) =>
  value > 0.8 ? 'text-negative' : value > 0.6 ? 'text-warning' : 'text-light';

  const columns: QTableColumn[] = [

  {
    name: 'custId',
    label: '고객코드',
    field: 'custId',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    label: '고객명',
    field: 'name',
    align: 'center',
    sortable: true,
  },
  {
    name: 'trtrId',
    align: 'center',
    label: '조직ID',
    field: 'trtrId',
    sortable: true,
  },
  {
    name: 'idfyNo',
    align: 'center',
    label: '식별번호',
    field: 'idfyNo',
  },
  {
    name: 'recdCretDt',
    align: 'center',
    label: '등록일',
    field: 'recdCretDt',
  },
  {
    name: 'recdChgDt',
    align: 'center',
    label: '수정일',
    field: 'recdChgDt',
  },
  {
    name: 'trtOrgId',
    align: 'center',
    label: '처리조직명',
    field: 'trtOrgId',
  },
  ];


// Fetch Data Interval
const intervalId = ref<any>(null);
  
  onUnmounted(() => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  });
  
  onMounted(() => {
    getCustomerStatus();
  
    intervalId.value = setInterval(() => {
        getCustomerStatus();
    }, 1000 * 10); // 10초
  });
</script>
../composables/useCustomerStatus_old