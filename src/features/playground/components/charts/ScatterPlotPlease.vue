<template>
  <q-card flat square bordered class="q-pa-sm bg-grey-10">
    <q-card-section class="no-margin no-padding text-subtitle2">
      Scatter Chart
    </q-card-section>
    <q-card-section class="no-margin no-padding">
      <VChart
        :option="option"
        class="q-mt-md"
        autoresize
        :loadingOptions="loadingOptions"
        style="height: 285px"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import * as echarts from 'echarts';
import VChart, { THEME_KEY } from 'vue-echarts';

import { use } from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  GridComponent,
  ScatterChart,
  CanvasRenderer,
]);

provide(THEME_KEY, 'dark');

const generateData = (count: number) => {
  const getCurrentTimestamp = () => Math.floor(Date.now() / 1000) * 1000;

  let prevBaseTimestamp = getCurrentTimestamp();

  let returnToData = [];
  let xTimestamp;
  let yDuration;
  let dataType;
  let globalNo;

  for (let i = 0; i < count; i++) {
    // xTimestamp = echarts.format.formatTime('hh:mm:ss', time, false);
    xTimestamp = prevBaseTimestamp + i * 1000;
    yDuration = Math.floor(Math.random() * 30000);
    globalNo = `global_number_${i}`;

    if (i % 3 === 0) {
      dataType = 'E';
    } else if (i % 5 === 0) {
      dataType = 'S';
    } else {
      dataType = 'I';
    }

    returnToData.push([xTimestamp, yDuration, dataType, globalNo]);
  }

  return returnToData;
};

const dataCount = 500;
const data = generateData(dataCount);
const loadingOptions = {
  text: 'Loading...',
  color: '#46d2f1',
  maskColor: 'rgba(255, 255, 255, 0.4)',
};
const option = ref({
  backgroundColor: '#212121',

  title: {
    text: echarts.format.addCommas(dataCount) + ' Transactions',
    left: 10,
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false,
      },
      restore: {},
      dataView: { readOnly: false },
      saveAsImage: {
        pixelRatio: 2,
      },
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    valueFormatter: (value: number): string => (value / 1000).toFixed(2) + 's',
    backgroundColor: '#151717',
    borderColor: '#151717',
    textStyle: {
      color: '#fff',
    },
  },
  grid: {
    bottom: 90,
  },
  dataZoom: [{ type: 'inside' }, { type: 'slider' }],
  xAxis: {
    data: data[0],
    type: 'time',
    silent: false,
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },
  yAxis: {
    data: data[1],
    type: 'value',
    silent: false,
    axisLabel: {
      formatter: (value: number): string => (value / 1000).toFixed(2) + 's',
    },
    splitArea: {
      show: false,
    },
  },
  legend: {},
  series: [
    {
      name: '정상',
      type: 'scatter',
      symbolSize: 4,
      color: '#57f000',
      data: data.filter((d) => d[2] === 'I'),
      // Set `large` for large data amount
      large: true,
    },
    {
      name: '비즈니스에러',
      type: 'scatter',
      symbolSize: 4,
      color: '#F2C037',
      data: data.filter((d) => d[2] === 'E'),
      // Set `large` for large data amount
      large: true,
    },
    {
      name: '시스템에러',
      type: 'scatter',
      symbolSize: 4,
      color: '#C10015',
      data: data.filter((d) => d[2] === 'S'),
      // Set `large` for large data amount
      large: true,
    },
  ],
});

console.log(data);
</script>

<style scoped></style>
