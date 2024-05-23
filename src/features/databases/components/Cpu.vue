<template>
  <q-card flat square bordered class="q-pa-sm bg-grey-10">
    <q-card-section
      class="no-margin no-padding row no-wrap items-center text-subtitle2"
    >
      <q-icon
        :name="symRoundedShowChart"
        class="q-mr-sm text-grey-6"
        size="xs"
      />
      CPU
      <q-space />
      <q-btn flat dense size="sm" :icon="symRoundedDownload" @click="saveImage">
        <q-tooltip>Download PNG</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section class="no-margin no-padding">
      <ECharts
        ref="cpuUsageChart"
        :option="options"
        class="q-mt-md"
        :resizable="true"
        autoresize
        style="height: 233px"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import ECharts, { THEME_KEY } from 'vue-echarts';
import { provide, ref } from 'vue';

import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import {
  symRoundedDownload,
  symRoundedShowChart,
} from '@quasar/extras/material-symbols-rounded';

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

provide(THEME_KEY, 'dark');

const cpuUsageChart = ref(null);

const saveImage = () => {
  const linkSource = cpuUsageChart.value.getDataURL();
  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  downloadLink.href = linkSource;
  downloadLink.target = '_self';
  downloadLink.download = 'CpuUsageChart.png';
  downloadLink.click();
};

const options = ref({
  backgroundColor: '#212121',
  title: {
    show: false,
    text: 'Stacked Area Chart',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
});
</script>
