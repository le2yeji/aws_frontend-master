<template>
  <div>
    <q-card flat square bordered class="q-pa-sm bg-grey-10">
      <q-card-section class="no-margin no-padding text-subtitle2">
        Bar Chart
        <q-btn
          flat
          dense
          size="sm"
          icon="download"
          class="float-right"
          @click="SaveImage"
        >
          <q-tooltip>Download PNG</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section class="no-margin no-padding">
        <ECharts
          ref="barchart"
          :option="options"
          class="q-mt-md"
          :resizable="true"
          autoresize
          style="height: 300px"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, provide } from 'vue';
import ECharts, { THEME_KEY } from 'vue-echarts';
import 'echarts';

export default defineComponent({
  name: 'BarChart',
  setup() {
    provide(THEME_KEY, 'dark');
    return {
      options: {
        backgroundColor: '#212121',
        legend: {
          bottom: 10,
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1],
          ],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          top: '5%',
          containLabel: true,
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      },
    };
  },
  components: {
    ECharts,
  },
  methods: {
    SaveImage() {
      const linkSource = this.$refs.barchart.getDataURL();
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = '_self';
      downloadLink.download = 'BarChart.png';
      downloadLink.click();
    },
  },
});
</script>

<style scoped></style>
