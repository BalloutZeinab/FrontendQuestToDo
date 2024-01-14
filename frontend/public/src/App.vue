<template>
  <div class="container">
    <AppHeader />
    <router-view />
  </div>
</template>


<script setup lang="ts">
import AppHeader from "../src/components/common/AppHeader.vue";
</script>

<style>
/* Globale Stile für App.vue */
:root {
  --teal: #008080; /* Teal color */
  --soft-cyan: #4DB6AC; /* Soft Cyan color */
  --slate-gray: #607D8B; /* Slate Gray color */
  --charcoal: #34495E; /* Charcoal color */
  --white: #fff; /* White color */
  --ivory-white: #FFFFF0; /* Ivory White color */
  --error-red: #ff3860; /* Error Red color */
  --completed-color: #4CAF50; /* Completed color */
  --darker-teal: #006666; /* Darker teal color, manually calculated */
}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: var(--ivory-white);
  color: var(--slate-gray); /* Basic text color */
}

h1, h2, h3, h4, h5, h6 {
  color: var(--charcoal); /* Heading color */
}

a {
  color: var(--teal);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: var(--soft-cyan);
}

button {
  padding: 10px 20px;
  background-color: var(--teal);
  color: var(--white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--darker-teal); /* Using the manually calculated darker teal color */
}

input, select, textarea {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--slate-gray);
  border-radius: 4px;
}

label {
  display: block;
  margin-bottom: 5px;
}

/* Responsives Container-Styling */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Weitere Hilfsklassen und responsive Stile können hier hinzugefügt werden */
</style>