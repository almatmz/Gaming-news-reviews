<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<style>
:root {
  --bg-color: #121212;
  --card-bg: #1e1e1e;
  --primary: #bb86fc;
  --secondary: #03dac6;
  --text: #e0e0e0;
  --text-muted: #a0a0a0;
  --error: #cf6679;
}

body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--bg-color);
  color: var(--text);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

input,
textarea,
button {
  font-family: inherit;
  border-radius: 8px;
  border: none;
  padding: 12px;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
}

input,
textarea {
  background: #2c2c2c;
  color: white;
  border: 1px solid #333;
}

input:focus,
textarea:focus {
  outline: 2px solid var(--primary);
}

button.btn-primary {
  background: var(--primary);
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

button.btn-primary:hover {
  opacity: 0.9;
}

h1,
h2,
h3 {
  color: var(--secondary);
}
</style>
