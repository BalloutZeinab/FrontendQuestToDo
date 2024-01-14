<template>
  <div class="task-overview-container">
    <!-- Loop through your tasks and render them with the 'task-card' class -->
    <div class="task-card" v-for="task in filteredTasks" :key="task.id">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <!-- Other task details -->
    </div>

    <!-- Add Task Button triggers TaskForm modal -->
    <button @click="showTaskForm = true" class="add-task-button">Neue Aufgabe hinzufügen</button>

    <!-- TaskForm Component -->
    <div v-if="showTaskForm" class="task-form-container">
      <TaskForm @close="showTaskForm = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TaskForm from '../components/tasks/TaskForm.vue';

interface Task {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

const tasks = ref<Task[]>([]);
const filteredTasks = ref<Task[]>([]);
const showTaskForm = ref(false);

const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/tasks');
    tasks.value = response.data;
    filteredTasks.value = response.data; // Initialize filteredTasks with data
    // Further code to fetch and process tasks
  } catch (error) {
    // Error handling
  }
};

onMounted(fetchTasks);
</script>

<style scoped>
/* Variables for the color scheme */
:root {
  --teal: #008080;
  --soft-cyan: #4DB6AC;
  --slate-gray: #607D8B;
  --charcoal: #34495E;
  --white: #fff;
}

.task-overview-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background-color: var(--white); /* Keep the background white */
}

.task-card {
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
}

.task-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.add-task-button {
  display: block;
  width: fit-content;
  padding: 10px 20px;
  margin: 10px auto;
  background-color: var(--teal);
  color: var(--ivory-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.add-task-button:hover,
.add-task-button:focus {
  background-color: var(--darker-teal);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Eventuell erforderliche Media Queries für Responsivität */
@media (max-width: 768px) {
  .task-overview-container {
    grid-template-columns: 1fr; /* Stapelt Karten auf kleineren Bildschirmen */
  }
}
</style>
