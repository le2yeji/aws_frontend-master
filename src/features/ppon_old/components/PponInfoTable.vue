<template>
  <q-card flat square bordered class="q-pa-sm">
    <q-card-section class="q-pa-none q-mb-md q-mt-none">
      <div class="text-subtitle2 row no-wrap items-center">
        <q-icon
          :name="symRoundedDatabase"
          class="q-mr-sm text-grey-6"
          size="xs"
        />
        PPON DB 확인용 화면
      </div>
    </q-card-section>

    <q-table
      flat
      dense
      square
      :rows="pponStatus"
      :rows-per-page-options="[7]"
      :columns="columns"
      row-key="ordNo"
      no-data-label="데이터 없음"

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

import usePponStatus from '../composables/usePponStatus';
  const { pponStatus, getPponStatus } = usePponStatus();


const initialPagination = {
  sortBy: 'ordNo',
  descending: false,
  page: 1,
  rowsPerPage: 10,
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
    name: 'ordNo',
    label: '오더명',
    field: 'ordNo',
    align: 'center',
    sortable: true,
  },
  {
    name: 'saId',
    align: 'center',
    label: '서비스 계약 아이디',
    field: 'saId',
    sortable: true,
  },
  {
    name: 'custId',
    align: 'center',
    label: '고객 아이디',
    field: 'custId',
  },
  {
    name: 'custName',
    align: 'center',
    label: '고객 이름',
    field: 'custName',
  },
  {
    name: 'custNo',
    align: 'center',
    label: '고객식별번호',
    field: 'custNo',
  },
  {
    name: 'custNoType',
    align: 'center',
    label: '고객식별번호 유형코드',
    field: 'custNoType',
  },
  {
    name: 'addrText',
    align: 'center',
    label: '설치 주소',
    field: 'addrText',
  },
  ];
  /*
const columns = [
  {
    name: 'empname',
    required: true,
    label: '고객명',
    align: 'center',
    field: (row) => row.empname,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'timestamp',
    align: 'center',
    label: '가입일',
    field: 'timestamp',
    sortable: true,
  },
  {
    name: 'sessionStatus',
    align: 'center',
    label: '가입 상태',
    field: 'sessionStatus',
  },
  {
    name: 'sessionUsage',
    align: 'center',
    label: '나이',
    field: 'sessionUsage',
  },
  {
    name: 'activeSessionCount',
    align: 'center',
    label: '생년월일',
    field: 'activeSessionCount',
    sortable: true,
  },
  {
    name: 'lockSessionCount',
    align: 'center',
    label: '주소',
    field: 'lockSessionCount',
    sortable: true,
  },
  {
    name: 'empmail',
    align: 'center',
    label: '이메일',
    field: 'rollbackSessionCount',
    sortable: true,
  },
  {
    name: 'twoPcPendingCount',
    align: 'center',
    label: '2PC Pending',
    field: 'twoPcPendingCount',
    sortable: true,
  },
  {
    name: 'parallelQueryCount',
    align: 'center',
    label: 'Parallel Query',
    field: 'parallelQueryCount',
    sortable: true,
  },
  {
    name: 'pqDegree',
    align: 'center',
    label: 'PQ Degree',
    field: 'pqDegree',
    sortable: true,
  },
  {
    name: 'unsableIndex',
    align: 'center',
    label: 'Unsable Index',
    field: 'unsableIndex',
    sortable: true,
  },
  {
    name: 'tableSpace',
    align: 'center',
    label: 'Table Space',
    field: 'tableSpace',
    sortable: true,
  },
  {
    name: 'openCursor',
    align: 'center',
    label: 'Open Cursor',
    field: 'openCursor',
    sortable: true,
  },
  {
    name: 'sqlExecute',
    align: 'center',
    label: 'SQL Execute',
    field: 'sqlExecute',
    sortable: true,
  },
];*/

const rows = [
  /*{
    empname: '이석환',
    timestamp: '2023-09-20 16:29:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 6,
    lockSessionCount: 4,
    rollbackSessionCount: 4,
    twoPcPendingCount: 4,
    parallelQueryCount: 4,
    pqDegree: 4,
    unsableIndex: 4,
    tableSpace: 4,
    openCursor: 4,
    sqlExecute: 4,
  },
  {
    empname: '이상호',
    timestamp: '2023-09-20 18:43:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 86,
    lockSessionCount: 7,
    rollbackSessionCount: 3,
    twoPcPendingCount: 3,
    parallelQueryCount: 3,
    pqDegree: 3,
    unsableIndex: 3,
    tableSpace: 3,
    openCursor: 3,
    sqlExecute: 3,
  },
  {
    custname: '엄유정',
    timestamp: '2022-02-20 17:39:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 16,
    lockSessionCount: 3,
    rollbackSessionCount: 6,
    twoPcPendingCount: 6,
    parallelQueryCount: 6,
    pqDegree: 6,
    unsableIndex: 6,
    tableSpace: 6,
    openCursor: 6,
    sqlExecute: 6,
  },
  {
    custname: '김도현',
    timestamp: '2023-05-12 11:12:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 37,
    lockSessionCount: 7,
    rollbackSessionCount: 43,
    twoPcPendingCount: 43,
    parallelQueryCount: 43,
    pqDegree: 43,
    unsableIndex: 43,
    tableSpace: 43,
    openCursor: 43,
    sqlExecute: 43,
  },
  {
    custname: '박희원',
    timestamp: '2023-09-20 16:29:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 61,
    lockSessionCount: 9,
    rollbackSessionCount: 39,
    twoPcPendingCount: 39,
    parallelQueryCount: 39,
    pqDegree: 39,
    unsableIndex: 39,
    tableSpace: 39,
    openCursor: 39,
    sqlExecute: 39,
  },
  {
    custname: '윤창섭',
    timestamp: '2023-09-20 09:29:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 12,
    lockSessionCount: 1,
    rollbackSessionCount: 78,
    twoPcPendingCount: 78,
    parallelQueryCount: 78,
    pqDegree: 78,
    unsableIndex: 78,
    tableSpace: 78,
    openCursor: 78,
    sqlExecute: 78,
  },
  {
    custname: '정치훈',
    timestamp: '2023-09-12 12:29:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 2,
    lockSessionCount: 8,
    rollbackSessionCount: 82,
    twoPcPendingCount: 82,
    parallelQueryCount: 82,
    pqDegree: 82,
    unsableIndex: 82,
    tableSpace: 82,
    openCursor: 82,
    sqlExecute: 82,
  },
  {
    custname: '노민지',
    timestamp: '2023-08-12 06:17:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 32,
    lockSessionCount: 7,
    rollbackSessionCount: 65,
    twoPcPendingCount: 65,
    parallelQueryCount: 65,
    pqDegree: 65,
    unsableIndex: 65,
    tableSpace: 65,
    openCursor: 65,
    sqlExecute: 65,
  },
  {
    custname: '이예지',
    timestamp: '2023-09-20 16:29:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 25,
    lockSessionCount: 1,
    rollbackSessionCount: 49,
    twoPcPendingCount: 49,
    parallelQueryCount: 49,
    pqDegree: 49,
    unsableIndex: 49,
    tableSpace: 49,
    openCursor: 49,
    sqlExecute: 49,
  },
  {
    custname: '이수연',
    timestamp: '2023-09-20 16:29:48',
    sessionStatus: '29 / 28 / 1',
    sessionUsage: 0.27,
    activeSessionCount: 26,
    lockSessionCount: 5,
    rollbackSessionCount: 2,
    twoPcPendingCount: 2,
    parallelQueryCount: 2,
    pqDegree: 2,
    unsableIndex: 2,
    tableSpace: 2,
    openCursor: 2,
    sqlExecute: 2,
  },*/
];

// Fetch Data Interval
const intervalId = ref<any>(null);
  
  onUnmounted(() => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }
  });
  
  onMounted(() => {
    getPponStatus();
  
    intervalId.value = setInterval(() => {
        getPponStatus();
    }, 1000 * 10); // 10초
  });
</script>