<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Header from '@/components/common/AppHeader.vue';
import TaskDetails from '@/components/tasks/TaskDetails.vue';

interface Task {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  // Weitere Eigenschaften deiner Task definieren
}

const selectedTask = ref<Task | string | string[] | null>(null);

onMounted(async () => {
  const taskId = 1; // Annahme: eine Task-ID, die abgerufen wird
  selectedTask.value = await fetchTaskDetails(taskId);
});

// Funktion zum Abrufen der Aufgabeninformationen
const fetchTaskDetails = async (taskId: number): Promise<Task | null> => {
  try {
    const response = await axios.get<Task>(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Aufgabeninformationen:', error);
    return null;
  }
};
</script>

<template>
  <div class="task-details-view">
    <Header />
    <main>
      <h2>Aufgabendetails</h2>
      <TaskDetails :task="selectedTask" v-if="selectedTask" />
      <p v-else class="not-found-message">Die ausgewählte Aufgabe wurde nicht gefunden.</p>
    </main>
  </div>
</template>

<style scoped>
.task-details-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background-color: var(--ivory-white);
}

.not-found-message {
  color: var(--soft-cyan);
  font-weight: bold;
}
</style>