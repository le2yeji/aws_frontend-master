<template>
  <q-page class="q-pa-sm fit column no-wrap q-gutter-y-sm">
    <div class="col-auto">
      <!-- TOP -->
      <div class="row no-wrap items-center">
        <!-- Solutions Component -->
        <Solutions />
        <!-- <q-space /> -->
        <!-- APIs Component -->
        <!-- <Apis /> -->
      </div>
    </div>
    <!-- BODY -->
    <div class="col-auto">
      <div class="row no-wrap q-gutter-x-sm full-height">
        <div class="col-auto" style="min-height: 300px; width: 440px">
          <!-- DB Instances -->
          <DatabaseInstances />
        </div>
        <div class="col-grow" style="min-height: 300px">
          <!-- DB Instances Detail -->
          <DatabaseInstancesDetails />
        </div>
      </div>
    </div>
    <div class="col-auto">
      <DatabaseSessionsDetails />
    </div>
    <div class="col-auto row no-wrap q-gutter-x-sm">
      <div class="col bg-grey-7" style="min-width: 410px">
        <Cpu />
      </div>
      <div class="col bg-grey-7" style="min-width: 410px">
        <ActiveSession />
      </div>
      <div class="col q-pa-sm bg-grey-7" style="min-width: 410px">c</div>
      <div class="col q-pa-sm bg-grey-7" style="min-width: 410px">d</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import DatabaseInstances from '../components/DatabaseInstances.vue';
import DatabaseInstancesDetails from '../components/DatabaseInstancesDetails.vue';
import DatabaseSessionsDetails from '../components/DatabaseSessionsDetails.vue';
import Cpu from '../components/Cpu.vue';
import ActiveSession from '../components/ActiveSession.vue';
</script>

<style lang="scss" scoped></style>
