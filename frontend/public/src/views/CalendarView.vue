<template>
  <div>
    <h2>Aufgabenübersicht</h2>
    <div class="filters-container">
      <DateFilter @filterByDate="filterTasksByDate" class="date-filter" />
      <MonthFilter @filterByMonth="filterTasksByMonth" class="month-filter" />
    </div>
    <TaskList :tasks="filteredTasks" @toggleComplete="toggleTaskComplete" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import DateFilter from '../components/filters/DateFilter.vue';
import MonthFilter from '../components/filters/MonthFilter.vue';
import TaskList from "../components/tasks/TaskList.vue";
import {onMounted, ref} from "vue";

interface Task {
  id: number;
  startDate: string;

}

const tasks = ref<Task[]>([]);
const filteredTasks = ref<Task[]>([]);

const fetchTasks = async () => {
  try {
    const response = await axios.get<Task[]>('/api/tasks');
    tasks.value = response.data;
    filterTasksByDate(); // Filtern nach aktuellem Datum beim Laden der Aufgaben
  } catch (error) {
    console.error('Fehler beim Abrufen der Aufgaben:', error);
  }
};

const filterTasksByDate = (date?: string) => {
  filteredTasks.value = date
      ? tasks.value.filter(task => task.startDate === date)
      : tasks.value;
};

const filterTasksByMonth = ({ year, month }: { year: number; month: number }) => {
  filteredTasks.value = tasks.value.filter(task => {
    const taskDate = new Date(task.startDate);
    return taskDate.getFullYear() === year && taskDate.getMonth() === month - 1;
  });
};

const toggleTaskComplete = async (taskId: number) => {
  try {
    const response = await axios.put<Task>(`/api/tasks/${taskId}`, {
      completed: true,
    });
    tasks.value = tasks.value.map(task => (task.id === taskId ? response.data : task));
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Aufgabenstatus:', error);
  }
};

onMounted(fetchTasks);
</script>

<style scoped>
h2 {
  color: #34495E; /* Charcoal Farbe */
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  background-color: #FFFFF0; /* Elfenbeinweiß als heller Hintergrund */
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Zusätzliche Stile für Responsivität und Abstände */
@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
  }

  .date-filter,
  .month-filter {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
