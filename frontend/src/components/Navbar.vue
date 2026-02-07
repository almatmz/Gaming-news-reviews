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
  white-space: nowrap;
  flex-shrink: 0;
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

a:not(.login-btn):hover,
a:not(.login-btn).router-link-active {
  color: var(--primary, #bb86fc);
}

a:not(.login-btn)::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary, #bb86fc);
  transition: width 0.3s;
}

a:not(.login-btn):hover::after,
a:not(.login-btn).router-link-active::after {
  width: 100%;
}

.logout-btn,
.login-btn {
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition:
    transform 0.2s,
    filter 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn {
  background-color: var(--primary, #bb86fc) !important;
  color: #000000 !important;
}

.login-btn::after {
  display: none;
}

.login-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  color: #000000 !important;
}

.logout-btn {
  background: var(--error, #cf6679);
  color: white !important;
}

.logout-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  color: white !important;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  z-index: 102;
  padding: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: var(--text, white);
  border-radius: 5px;
  transition: 0.3s;
}

.hamburger.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger.is-active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.8rem 1rem;
  }

  .logo {
    font-size: 1.1rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .hamburger {
    display: flex;
    margin-left: auto;
    margin-right: 0;
    z-index: 1001;
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
    z-index: 1000;
  }

  .links.mobile-open {
    clip-path: circle(150% at 100% 0);
  }
}
</style>
