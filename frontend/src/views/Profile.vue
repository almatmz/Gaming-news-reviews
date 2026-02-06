<template>
  <div class="profile-page">
    <h2>User Profile</h2>
    <div class="profile-card">
      <div v-if="msg" class="success-msg">{{ msg }}</div>
      <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>

      <label>Username</label>
      <input v-model="profile.username" type="text" />

      <label>Email</label>
      <input v-model="profile.email" type="email" />

      <label>New Password (Optional)</label>
      <input
        v-model="password"
        type="password"
        placeholder="Leave blank to keep current"
      />

      <button @click="updateProfile" class="btn-primary">Save Changes</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const profile = ref({ username: "", email: "" });
const password = ref("");
const msg = ref("");
const errorMsg = ref("");

onMounted(async () => {
  try {
    const res = await api.get("/api/users/profile");
    profile.value = res.data;
  } catch (err) {
    console.error("Failed to load profile", err);
  }
});

const updateProfile = async () => {
  msg.value = "";
  errorMsg.value = "";

  try {
    const payload = {
      username: profile.value.username,
      email: profile.value.email,
    };

    if (password.value) {
      payload.password = password.value;
    }

    const res = await api.put("/api/users/profile", payload);

    profile.value = res.data;
    msg.value = "Profile updated successfully!";
    password.value = "";
  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Failed to update profile";
    console.error(err);
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
}
.profile-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
}
.success-msg {
  background: rgba(3, 218, 198, 0.2);
  color: #03dac6;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
}

.error-msg {
  background: rgba(207, 102, 121, 0.2);
  color: #cf6679;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
