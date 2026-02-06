<template>
  <nav class="navbar">
    <div class="logo">Game news & reviews</div>
    <div class="links">
      <router-link to="/">News</router-link>
      <router-link v-if="auth.isAuthenticated" to="/reviews"
        >My Reviews</router-link
      >
      <router-link v-if="auth.isAuthenticated" to="/profile"
        >Profile</router-link
      >

      <button
        v-if="auth.isAuthenticated"
        @click="handleLogout"
        class="logout-btn"
      >
        Logout
      </button>
      <router-link v-else to="/login" class="login-btn"
        >Login / Register</router-link
      >
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  background-color: var(--card-bg);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

.links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

a:hover,
a.router-link-active {
  color: var(--secondary);
}

.logout-btn {
  background: var(--error);
  color: white;
  padding: 8px 16px;
  width: auto;
  margin: 0;
  cursor: pointer;
}

.login-btn {
  background: var(--primary);
  color: black;
  padding: 8px 16px;
  border-radius: 8px;
}
</style>
