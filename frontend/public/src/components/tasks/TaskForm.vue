<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const newTask = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
});

const addTask = async () => {
  try {
    if (!isValidDate(newTask.value.startDate) || !isValidDate(newTask.value.endDate)) {
      console.error('Ungültiges Datumsformat. Bitte das richtige Format verwenden.');
      return;
    }

    await axios.post('/api/tasks', newTask.value);

    newTask.value = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    };
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Aufgabe:', error);
  }
};

// Hilfsfunktion zur Überprüfung des Datumsformats
const isValidDate = (dateString: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};
</script>

<template>
  <form @submit.prevent="addTask" class="task-form">
    <input v-model="newTask.title" placeholder="Titel" required />
    <input v-model="newTask.description" placeholder="Beschreibung" required />

    <!-- Füge eine Validierung für das Datumsformat hinzu -->
    <input type="date" v-model="newTask.startDate" placeholder="Startdatum" required />
    <input type="date" v-model="newTask.endDate" placeholder="Enddatum" required />

    <button type="submit">Aufgabe hinzufügen</button>
  </form>
</template>

<style scoped>
.task-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid var(--slate-gray);
  border-radius: 8px;
  background-color: var(--ivory-white);
}

.task-form input[type="text"],
.task-form input[type="date"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--slate-gray);
  border-radius: 4px;
}

.task-form button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: var(--teal);
  border: none;
  border-radius: 4px;
  color: var(--ivory-white);
  cursor: pointer;
}

.task-form button[type="submit"]:hover {
  background-color: var(--darker-teal);
}
</style>