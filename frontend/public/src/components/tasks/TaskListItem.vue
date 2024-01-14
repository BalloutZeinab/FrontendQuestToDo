<template>
  <div class="task-list-item">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>Startdatum: {{ formatDate(task.startDate) }}</p>
    <button class="complete-button" @click="toggleComplete">
      {{ task.completed ? 'Als unvollständig markieren' : 'Als abgeschlossen markieren' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  task: {
    type: Object as () => {
      id: number;
      title: string;
      description: string;
      startDate: string;
      completed: boolean;
    },
    required: true
  }
});

const emits = defineEmits(['toggleComplete']);

const toggleComplete = async () => {
  try {
    await axios.put(`http://localhost:8080/api/tasks/${props.task.id}`, {
      completed: !props.task.completed,
    });
    emits('toggleComplete', props.task.id);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Aufgabenstatus:', error);
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.task-list-item {
  border: 1px solid var(--slate-gray);
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  background-color: var(--ivory-white);
}

.complete-button {
  background-color: var(--teal);
  color: var(--ivory-white);
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.complete-button:hover {
  background-color: var(--darker-teal);
}

</style>