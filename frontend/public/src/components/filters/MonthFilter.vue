<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

const selectedMonth = ref('');
const emits = defineEmits(['filterByMonth']);

watch(selectedMonth, (newMonth) => {
  if (newMonth) {
    const [year, month] = newMonth.split('-').map(Number);
    emits('filterByMonth', { year, month });
  }
});
</script>

<template>
  <div class="month-filter">
    <label for="month">Filter nach Monat:</label>
    <input type="month" v-model="selectedMonth" />
  </div>
</template>

<style scoped>
.month-filter {
  margin-bottom: 20px;
  background-color: #f7f7f7; /* leichter Hintergrund */
  padding: 10px;
  border-radius: 5px;
}

.month-filter label {
  font-weight: bold;
  margin-right: 10px;
  color: #008080; /* Teal Farbe */
}

.month-filter input[type="month"] {
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
}
</style>
