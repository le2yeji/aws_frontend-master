<template>
  <q-card flat square bordered class="q-pa-md">
    <!-- 입력 필드 및 검색 버튼 추가 -->
    <q-card-section>
      <div class="row justify-end q-gutter-sm items-center">
        <!-- 그룹명 라벨 및 입력 필드 -->
        <div class="col" style="max-width: 300px">
          <q-input v-model="filterGrpId" label="그룹명" filled dense />
        </div>
        
        <!-- 코드 라벨 및 입력 필드 -->
        <div class="col" style="max-width: 300px">
          <q-input v-model="filterCd" label="코드" filled dense />
        </div>
        
        <!-- 검색 버튼 -->
        <q-btn label="조회" color="primary" @click="fetchBaseInfo" class="q-ml-md" />
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row items-center">
        <q-icon name="storage" class="q-mr-sm text-grey-6" size="xs" />
        <div class="text-subtitle2">기본정보</div>
      </div>
    </q-card-section>
    <q-table
      flat
      dense
      square
      :rows="baseinfoStatus.outDs"
      :rows-per-page-options="[4]"
      :columns="columns"
      row-key="grpId"
      no-data-label="찾는 정보가 없습니다."
      :pagination="initialPagination"
      class="q-mt-md"
    />
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QTableColumn, QInput, QBtn, QIcon } from 'quasar';
import useBaseinfoStatus from '../composables/useBaseinfoStatus';

const { baseinfoStatus, getBaseinfoStatus } = useBaseinfoStatus();
const filterGrpId = ref('');
const filterCd = ref('');

const columns: QTableColumn[] = [
  { name: 'grpId', label: '그룹명', field: 'grpId', align: 'center', sortable: true },
  { name: 'cd', label: '코드', field: 'cd', align: 'center' },
  { name: 'name', label: '이름', field: 'name', align: 'center' },
  { name: 'ref1', label: '참고1', field: 'ref1', align: 'center' },
  { name: 'ref2', label: '참고2', field: 'ref2', align: 'center' },
  { name: 'remark', label: '기타', field: 'remark', align: 'center' },
  { name: 'regEmpNo', label: '등록자번호', field: 'regEmpNo', align: 'center' },
  { name: 'regEmpName', label: '등록자', field: 'regEmpName', align: 'center' },
  { name: 'regDate', label: '등록일', field: 'regDate', align: 'center' }
];

const initialPagination = {
  sortBy: 'cd',
  descending: false,
  page: 1,
  rowsPerPage: 20
};

const fetchBaseInfo = async () => {
  console.log("Searching for:", filterGrpId.value, filterCd.value);  // 검색 로그 출력
  await getBaseinfoStatus(filterGrpId.value, filterCd.value);
};
</script>
