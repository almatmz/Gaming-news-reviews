<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isRegister ? "Join Game News" : "Welcome Back" }}</h2>

      <form @submit.prevent="handleSubmit">
        <input
          v-if="isRegister"
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        />

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="btn-primary">
          {{ isRegister ? "Sign Up" : "Login" }}
        </button>
      </form>

      <p class="toggle-text" @click="toggleMode">
        {{
          isRegister
            ? "Already have an account? Login"
            : "New here? Create account"
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const isRegister = ref(false);
const error = ref("");

const form = ref({ username: "", email: "", password: "" });

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  error.value = "";
};

const handleSubmit = async () => {
  try {
    if (isRegister.value) {
      await auth.register(form.value);
    } else {
      await auth.login({
        email: form.value.email,
        password: form.value.password,
      });
    }
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Authentication failed";
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.auth-card {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.toggle-text {
  margin-top: 1rem;
  color: var(--secondary);
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle-text:hover {
  text-decoration: underline;
}

.error-msg {
  color: var(--error);
  font-size: 0.9rem;
}
</style>
