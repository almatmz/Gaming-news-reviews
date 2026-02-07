<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <img src="../assets/game_logo.png" alt="logo" />
        <span>News & Reviews</span>
      </div>

      <button
        class="hamburger"
        @click="toggleMenu"
        :class="{ 'is-active': isMenuOpen }"
        aria-label="Toggle menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <div class="links" :class="{ 'mobile-open': isMenuOpen }">
        <router-link to="/" @click="closeMenu">News</router-link>
        <router-link to="/top-games" @click="closeMenu">Top Games</router-link>

        <template v-if="auth.isAuthenticated">
          <router-link to="/reviews" @click="closeMenu">My Reviews</router-link>
          <router-link to="/profile" @click="closeMenu">Profile</router-link>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>

        <router-link v-else to="/login" class="login-btn" @click="closeMenu">
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleLogout = () => {
  auth.logout();
  closeMenu();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  background-color: var(--card-bg, #1a1a1a);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--primary, #bb86fc);
  letter-spacing: -0.5px;
}

.logo img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

a {
  text-decoration: none;
  color: var(--text, #e0e0e0);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
}

a:hover,
a.router-link-active {
  color: var(--primary, #bb86fc);
}

a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary, #bb86fc);
  transition: width 0.3s;
}

a:hover::after,
a.router-link-active::after {
  width: 100%;
}

.logout-btn,
.login-btn {
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s;
}

.logout-btn {
  background: var(--error, #cf6679);
  color: white;
}

.login-btn {
  background: var(--primary, #bb86fc);
  color: #000;
}

.logout-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  color: white;
}

.login-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  color: #000 !important;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  z-index: 102;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: var(--text, white);
  border-radius: 5px;
  transition: 0.3s;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
    margin-left: auto;
  }

  .links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--card-bg, #1a1a1a);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    align-items: center;
    clip-path: circle(0% at 100% 0);
    transition: clip-path 0.5s ease-in-out;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  }

  .links.mobile-open {
    clip-path: circle(150% at 100% 0);
  }
}
</style>
