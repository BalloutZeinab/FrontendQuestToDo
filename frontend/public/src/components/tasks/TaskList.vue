<template>
  <div class="task-list">
    <Header />
    <main>
      <h2>Aufgabenübersicht</h2>
      <DateFilter @filterByDate="handleFilterByDate" />
      <MonthFilter @filterByMonth="handleFilterByMonth" />
      <div class="task-container">
        <TaskListItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @toggleComplete="fetchTasks"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Header from '@/components/common/AppHeader.vue';
import DateFilter from '@/components/filters/DateFilter.vue';
import MonthFilter from '@/components/filters/MonthFilter.vue';
import TaskListItem from '@/components/tasks/TaskListItem.vue';

interface Task {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);

const fetchTasks = async () => {
  try {
    const response = await axios.get<Task[]>('/api/tasks');
    tasks.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Aufgaben:', error);
  }
};

const handleFilterByDate = async (date: string) => {
  try {
    const response = await axios.get<Task[]>('/api/tasks/byDate', { params: { date } });
    tasks.value = response.data;
  } catch (error) {
    console.error('Fehler beim Filtern der Aufgaben nach Datum:', error);
  }
};

const handleFilterByMonth = async ({ year, month }: { year: number; month: number }) => {
  try {
    const response = await axios.get<Task[]>('/api/tasks/byMonth', { params: { year, month } });
    tasks.value = response.data;
  } catch (error) {
    console.error('Fehler beim Filtern der Aufgaben nach Monat:', error);
  }
};

onMounted(fetchTasks);
</script>

