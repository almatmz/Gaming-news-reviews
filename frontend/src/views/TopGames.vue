<template>
  <div class="top-games">
    <h1>Top Rated Games</h1>
    <div v-if="loading">Loading top games...</div>
    <div v-else class="games-grid">
      <div v-for="game in games" :key="game.id" class="game-card">
        <img :src="game.background_image" :alt="game.name" class="game-img" />
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <p class="rating">⭐ {{ game.rating }} / 5</p>
          <p>Released: {{ game.released }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const games = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await api.get("/api/news/top-rated");
    games.value = res.data;
  } catch (error) {
    console.error("Failed to load top games", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.game-card {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.game-card:hover {
  transform: translateY(-5px);
}

.game-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.game-info {
  padding: 1rem;
}

h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: white;
}

p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}
</style>
