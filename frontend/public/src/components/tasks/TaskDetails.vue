<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

interface Task {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  // Weitere Eigenschaften deiner Task definieren
}

const route = useRoute();
const selectedTaskId = ref(route.params.id);
const task = ref<Task | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get<Task>(`/api/tasks/${selectedTaskId.value}`);
    task.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Aufgabe:', error);
  }
});
</script>

<template>
  <div class="task-details">
    <template v-if="task">
      <h3 class="task-title">{{ task.title }}</h3>
      <p class="task-description">{{ task.description }}</p>
      <div class="task-dates">
        <p>Startdatum: {{ task.startDate }}</p>
        <p>Enddatum: {{ task.endDate }}</p>
      </div>
      <p class="task-completed">Abgeschlossen: {{ task.completed ? 'Ja' : 'Nein' }}</p>
    </template>
    <template v-else>
      <p>Keine Aufgabe ausgewählt.</p>
    </template>
  </div>
</template>

<style scoped>
.task-details {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--soft-cyan);
  padding: 20px;
  border-radius: 8px;
}

.task-title {
  color: var(--charcoal);
}

.task-description {
  color: var(--slate-gray);
}

.task-dates p {
  color: var(--teal);
}

.task-completed {
  font-weight: bold;
  color: var(--completed-color); /* Define this color variable in your root styles */
}
</style>