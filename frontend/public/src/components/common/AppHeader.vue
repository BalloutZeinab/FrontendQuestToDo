<template>
  <header class="header">
    <nav class="navigation">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/task-overview" class="nav-item">Task Overview</router-link>
      <!-- Weitere Links hier einfügen -->
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--teal);
  padding: 10px;
  border-bottom: 1px solid var(--soft-cyan);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-item {
  margin: 0 15px;
  text-decoration: none;
  color: var(--white);
  font-weight: bold;
}

.nav-item:hover {
  text-decoration: underline;
  color: var(--soft-cyan);
}
</style>
<script setup lang="ts">
</script>
