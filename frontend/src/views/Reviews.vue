<template>
  <div class="reviews-page">
    <div class="container">
      <div class="header-section">
        <h2>My Game Reviews</h2>
        <div class="banner-wrapper">
          <img src="../assets/img.jpg" alt="Featured Game" class="hero-img" />
        </div>
      </div>

      <div class="content-grid">
        <div class="review-form">
          <h3>{{ isEditing ? "Edit Review" : "Write a Review" }}</h3>
          <input
            v-model="form.gameTitle"
            placeholder="Game Title (e.g. Elden Ring)"
          />
          <input
            v-model.number="form.rating"
            type="number"
            min="1"
            max="10"
            placeholder="Rating (1-10)"
          />
          <textarea
            v-model="form.content"
            rows="4"
            placeholder="Your thoughts..."
          ></textarea>

          <button @click="handleSubmit" class="btn-primary">
            {{ isEditing ? "Update Review" : "Post Review" }}
          </button>
          <button v-if="isEditing" @click="resetForm" class="cancel-btn">
            Cancel
          </button>
        </div>

        <div class="review-list">
          <div v-for="review in reviews" :key="review._id" class="review-item">
            <div class="review-header">
              <span class="game-title">{{ review.gameTitle }}</span>
              <span class="rating-badge">{{ review.rating }}/10</span>
            </div>
            <p class="review-content">{{ review.content }}</p>
            <div class="actions">
              <button @click="editReview(review)" class="edit-btn">Edit</button>
              <button @click="deleteReview(review._id)" class="delete-btn">
                Delete
              </button>
            </div>
          </div>
          <p v-if="reviews.length === 0" class="no-data">
            You haven't posted any reviews yet.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const reviews = ref([]);
const form = ref({ gameTitle: "", content: "", rating: null });
const isEditing = ref(false);
const editingId = ref(null);

const fetchReviews = async () => {
  try {
    const res = await api.get("/api/resource");
    reviews.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/api/resource/${editingId.value}`, form.value);
    } else {
      await api.post("/api/resource", form.value);
    }
    resetForm();
    fetchReviews();
  } catch (err) {
    alert(err.response?.data?.message || "Error saving review");
  }
};

const deleteReview = async (id) => {
  if (!confirm("Are you sure?")) return;
  try {
    await api.delete(`/api/resource/${id}`);
    fetchReviews();
  } catch (err) {
    console.error(err);
  }
};

const editReview = (review) => {
  isEditing.value = true;
  editingId.value = review._id;
  form.value = {
    gameTitle: review.gameTitle,
    content: review.content,
    rating: review.rating,
  };
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  form.value = { gameTitle: "", content: "", rating: null };
};

onMounted(fetchReviews);
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
}

.header-section {
  margin-bottom: 2rem;
}

.banner-wrapper {
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.review-form {
  background: var(--card-bg, #1e1e1e);
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  background: #2b2b2b;
  border: 1px solid #444;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
}

.review-item {
  background: #252525;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border-left: 4px solid var(--secondary, #bb86fc);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.game-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
}

.rating-badge {
  background: var(--primary, #bb86fc);
  color: black;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}

.edit-btn,
.delete-btn {
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  color: white;
}

.edit-btn {
  background: #4a4a4a;
}
.delete-btn {
  background: var(--error, #cf6679);
}

.cancel-btn {
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-primary {
  background: var(--primary, #bb86fc);
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>
