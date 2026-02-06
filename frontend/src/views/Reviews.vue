<template>
  <div class="reviews-page">
    <h2>My Game Reviews</h2>

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
.reviews-page {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .reviews-page {
    grid-template-columns: 1fr;
  }
}

.review-form {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
}

.review-item {
  background: #252525;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border-left: 4px solid var(--secondary);
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
  background: var(--primary);
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

.edit-btn {
  background: #4a4a4a;
  color: white;
  width: auto;
  padding: 5px 15px;
}
.delete-btn {
  background: var(--error);
  color: white;
  width: auto;
  padding: 5px 15px;
}
.cancel-btn {
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
}
</style>
