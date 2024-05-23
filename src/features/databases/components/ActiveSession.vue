<template>
  <q-card flat square bordered class="q-pa-sm bg-grey-10">
    <q-card-section class="q-pa-none q-mb-md q-mt-none">
      <div class="text-subtitle2 row no-wrap items-center">
        <q-icon name="show_chart" class="q-mr-sm text-grey-6" size="xs" />
        Active Sessions
      </div>
    </q-card-section>
    <q-card-section class="no-margin no-padding">
      <div style="height: 234px" ref="lineChart" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// const data = [
//   {
//     name: '1月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '2月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '3月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '4月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '5月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '6月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '7月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '8月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '9月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '10月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '11月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
//   {
//     name: '12月',
//     value: (Math.random() * 70 + 20).toFixed(2),
//     other: (Math.random() * 50).toFixed(2),
//   },
// ];

export default defineComponent({
  name: 'lineChart',
  setup() {
    const lineChart = ref(null);
    let myChart = ref(null);

    const router = useRouter();

    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value),
        ],
      };
    }
    let data = [];
    let now = new Date(1997, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }

    onMounted(() => {
      initEcharts(data);
      setInterval(function () {
        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }
        myChart.value.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      }, 1000);
    });

    //渲染echarts图
    const initEcharts = (data) => {
      myChart.value = echarts.init(lineChart.value);
      myChart.value.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data,
          },
        ],
      });
      myChart.value.off('click');
      myChart.value.getZr().off('click');
      myChart.value.getZr().on('click', (params) => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (
          myChart.value.containPixel('grid', pointInPixel) ||
          data.length === 0
        ) {
          router.push('/');
        }
      });
    };

    return {
      lineChart,
    };
  },
});
</script>
