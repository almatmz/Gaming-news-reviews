<template>
  <div class="news-grid">
    <div v-for="article in news" :key="article.url" class="news-card">
      <div class="card-image">
        <img
          :src="article.image || placeholder"
          alt="news preview"
          @error="onImgError"
        />
      </div>

      <div class="card-body">
        <span class="source">
          {{ article.source || "Gaming News" }}
        </span>

        <h3>{{ article.title }}</h3>

        <p>{{ truncateText(article.description) }}</p>

        <a
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="read-btn"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const news = ref([]);
const placeholder = "https://via.placeholder.com/400x200?text=No+Image";

const truncateText = (text) => {
  if (!text) return "No description available.";
  return text.length > 120 ? text.slice(0, 120) + "..." : text;
};

const onImgError = (e) => {
  e.target.src = placeholder;
};

onMounted(async () => {
  try {
    const res = await api.get("/api/news");
    news.value = res.data;
  } catch (err) {
    console.error("News load error:", err);
  }
});
</script>

<style scoped>
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  padding: 20px 0;
}

.news-card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-8px);
}

.card-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-body {
  padding: 20px;
}

.source {
  color: #03dac6;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
}

h3 {
  margin: 10px 0;
  font-size: 1.1rem;
  color: #fff;
}

p {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.4;
}

.read-btn {
  display: inline-block;
  margin-top: 15px;
  color: #03dac6;
  text-decoration: none;
  border: 1px solid #03dac6;
  padding: 8px 16px;
  border-radius: 6px;
  transition: 0.3s;
}

.read-btn:hover {
  background: #03dac6;
  color: #000;
}
</style>
