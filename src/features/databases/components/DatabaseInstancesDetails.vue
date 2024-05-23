<template>
  <q-card flat bordered square class="q-pa-sm bg-grey-10 full-height">
    <q-card-section class="q-pa-none q-mb-md q-mt-none">
      <div class="text-subtitle2 row no-wrap items-center">
        <q-icon
          :name="symRoundedDatabase"
          class="q-mr-sm text-grey-6"
          size="xs"
        />
        Database Instances Details
      </div>
    </q-card-section>

    <q-table
      flat
      dense
      square
      :rows="rows"
      :rows-per-page-options="[4]"
      :columns="columns"
      row-key="name"
      no-data-label="I didn't find anything for you"
      class="bg-grey-10"
      :pagination="initialPagination"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-grey-6"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-instanceStatus="props">
        <q-td :props="props">
          <q-badge
            rounded
            :label="props.value"
            class="q-py-xs q-px-md justify-center"
            :class="
              props.value === 'Normal' ? 'text-positive' : 'text-negative'
            "
            style="width: 70px"
            :style="
              props.value === 'Normal'
                ? 'background-color: rgba(89, 234, 186, 0.15)'
                : 'background-color: rgba(227, 98, 98, 0.15)'
            "
          />
        </q-td>
      </template>
      <template v-slot:body-cell-connectionStatus="props">
        <q-td :props="props">
          <q-badge
            rounded
            :label="props.value"
            class="q-py-xs q-px-md justify-center"
            :class="props.value === '성공' ? 'text-primary' : 'text-negative'"
            style="width: 70px"
            :style="
              props.value === '성공'
                ? 'background-color: rgba(22, 201, 255, 0.15)'
                : 'background-color: rgba(227, 98, 98, 0.15)'
            "
          />
        </q-td>
      </template>
      <template v-slot:body-cell-cpuUsage="props">
        <q-td :props="props">
          <div class="row no-wrap items-center q-gutter-sm q-px-sm">
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
      <template v-slot:body-cell-memoryUsage="props">
        <q-td :props="props">
          <div class="row no-wrap items-center q-gutter-sm q-px-sm">
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
      <template v-slot:body-cell-diskUsage="props">
        <q-td :props="props">
          <div class="row no-wrap items-center q-gutter-sm q-px-sm">
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

<script setup>
import { symRoundedDatabase } from '@quasar/extras/material-symbols-rounded';

const initialPagination = {
  sortBy: 'hostname',
  descending: false,
  page: 1,
  rowsPerPage: 6,
  // rowsNumber: xx if getting data from a server
};

const progressColorChanger = (value) =>
  value > 0.8 ? 'negative' : value > 0.6 ? 'warning' : 'primary';

const textColorChanger = (value) =>
  value > 0.8 ? 'text-negative' : value > 0.6 ? 'text-warning' : 'text-light';

const columns = [
  {
    name: 'hostname',
    required: true,
    label: '호스트명',
    align: 'center',
    field: (row) => row.hostname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'timestamp',
    align: 'center',
    label: '시간',
    field: 'timestamp',
    sortable: true,
  },
  {
    name: 'instanceStatus',
    align: 'center',
    label: '인스턴스 상태',
    field: 'instanceStatus',
  },
  {
    name: 'connectionStatus',
    align: 'center',
    label: '연결 상태',
    field: 'connectionStatus',
  },
  {
    name: 'cpuUsage',
    align: 'center',
    label: 'CPU 사용률',
    field: 'cpuUsage',
    sortable: true,
    style: 'min-width: 200px;',
  },
  {
    name: 'memoryUsage',
    align: 'center',
    label: 'MEMORY 사용률',
    field: 'memoryUsage',
    sortable: true,
    style: 'min-width: 200px;',
  },
  {
    name: 'diskUsage',
    align: 'center',
    label: 'DISK 사용률',
    field: 'diskUsage',
    sortable: true,
    style: 'min-width: 200px;',
  },
];

const rows = [
  {
    hostname: 'devtbilldb01',
    timestamp: '2023-09-20 16:29:48',
    cpuUsage: 0.6,
    memoryUsage: 0.24,
    diskUsage: 0.4,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devdhubdb01',
    timestamp: '2023-09-20 18:43:48',
    cpuUsage: 0.86,
    memoryUsage: 0.37,
    diskUsage: 0.3,
    instanceStatus: 'Down',
    connectionStatus: '성공',
  },
  {
    hostname: 'devteaidb01',
    timestamp: '2022-02-20 17:39:48',
    cpuUsage: 0.16,
    memoryUsage: 0.23,
    diskUsage: 0.6,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devtmitdb01',
    timestamp: '2023-05-12 11:12:48',
    cpuUsage: 0.37,
    memoryUsage: 0.67,
    diskUsage: 0.43,
    instanceStatus: 'Normal',
    connectionStatus: '실패',
  },
  {
    hostname: 'devtmitdb02',
    timestamp: '2023-09-20 16:29:48',
    cpuUsage: 0.61,
    memoryUsage: 0.49,
    diskUsage: 0.39,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devtmitdb03',
    timestamp: '2023-09-20 09:29:48',
    cpuUsage: 0.12,
    memoryUsage: 0.81,
    diskUsage: 0.78,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devtorddb01',
    timestamp: '2023-09-12 12:29:48',
    cpuUsage: 0.2,
    memoryUsage: 0.98,
    diskUsage: 0.82,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devtorddb02',
    timestamp: '2023-08-12 06:17:48',
    cpuUsage: 0.32,
    memoryUsage: 0.87,
    diskUsage: 0.65,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devtorddb03',
    timestamp: '2023-09-20 16:29:48',
    cpuUsage: 0.25,
    memoryUsage: 0.51,
    diskUsage: 0.49,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
  {
    hostname: 'devtportdb01',
    timestamp: '2023-09-20 16:29:48',
    cpuUsage: 0.26,
    memoryUsage: 0.65,
    diskUsage: 0.2,
    instanceStatus: 'Normal',
    connectionStatus: '성공',
  },
];
</script>
