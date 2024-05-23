<template>
  <div class="container">
    <div
      v-for="(hexagon, index) in hexagons"
      :key="index"
      class="hexagon"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const hexagons = ref([]);
const totalHexagons = 20; // 변경 가능: 생성할 정육각형의 총 개수

// 정육각형 생성 함수
function generateHexagons() {
  const angleIncrement = (2 * Math.PI) / totalHexagons;
  const radius = 1000; // 변경 가능: 원의 반지름
  const centerX = 200; // 변경 가능: 원의 중심 X 좌표
  const centerY = 200; // 변경 가능: 원의 중심 Y 좌표

  for (let i = 0; i < totalHexagons; i++) {
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    hexagons.value.push({ x, y });
  }
}

onMounted(() => {
  generateHexagons();
});
</script>

<style scoped>
.container {
  position: fixed;
  top: 50%; /* 화면의 중간으로 이동 */
  left: 50%; /* 화면의 중간으로 이동 */
  transform: translate(-50%, -50%); /* 정중앙으로 배치 */
}

.hexagon {
  width: 50px; /* 정육각형의 한 변의 길이 */
  height: 50px; /* 정육각형의 한 변의 길이 */
  background-color: #ccc; /* 육각형 배경색 */
  clip-path: polygon(
    50% 0,
    100% 25%,
    100% 75%,
    50% 100%,
    0 75%,
    0 25%
  ); /* 육각형 clip-path로 모양 설정 */
  position: absolute;
  transform: translate(-50%, -50%); /* 정육각형을 중심점 기준으로 이동 */
}
</style>
