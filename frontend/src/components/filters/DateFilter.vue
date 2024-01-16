<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

const selectedDate = ref('');
const emits = defineEmits(['filterByDate']);

watch(selectedDate, (newDate) => {
  if (newDate) {
    emits('filterByDate', newDate);
  }
});
</script>

<template>
  <div class="date-filter">
    <label for="date">Filter nach Datum:</label>
    <input type="date" v-model="selectedDate" />
  </div>
</template>

<style scoped>
.date-filter {
  margin-bottom: 20px;
  background-color: #f7f7f7; /* leichter Hintergrund */
  padding: 10px;
  border-radius: 5px;
}

.date-filter label {
  font-weight: bold;
  margin-right: 10px;
  color: #008080; /* Teal Farbe */
}

.date-filter input[type="date"] {
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
}
</style>